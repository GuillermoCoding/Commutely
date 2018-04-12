const axios = require('axios');
const { filterAsync } = require('node-filter-async');
const MongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV=='development') {
   require('dotenv').config(); 
}
exports.IndeedJobs = async ({title,homeAddress,city,state,commuteSelected,startingIndex})=>{
        console.log("Searching for jobs with: ");
        console.log("Job title: "+title);
        console.log("city: "+city);
        console.log("State: "+state);
        console.log("commute selected: "+commuteSelected);
        console.log("Starting index :"+startingIndex);
        console.log("Home address :"+homeAddress);
        const location = city+', '+state;
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_API_KEY}&q=${title}&l=${location}&start=${startingIndex}&radius=0&limit=10&format=json&highlight=0&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        const results = await filterAsync(response.data.results, async({company, city, state, country,latitude, longitude})=>{
            const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${company}+in+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            if (googleResponse.data.results.length == 1) {
              try {
                const companyAddress = googleResponse.data.results[0].formatted_address;
                const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${homeAddress}&mode=${commuteSelected.toLowerCase()}&destinations=${companyAddress}`);
                try {
                  const durationText = distanceResponse.data.rows[0].elements[0].duration.text;
                  if (durationText.split(' ').length==2) {
                    return true;
                  } else {
                    return false;
                  }
                } catch (err) {
                  console.log('Error converting commute time: ');
                  console.log(err);
                }
              } catch (err) {
                console.log('Error caught inside filterAsync');
                console.log(err);
              }
              

            }
        });
        const jobArray =  await results.map(async ({jobtitle, company, city, state, country,snippet, url,latitude, longitude})=>{
            try {
              console.log("Company name : "+company);
              console.log("Company city : "+city);
              console.log("Company state : "+state);
              const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${company}+in+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
              if (googleResponse.data.results.length == 1) {

                  const companyAddress = googleResponse.data.results[0].formatted_address;
                  console.log("Company address used for APIs: ");
                  console.log(companyAddress);
                  const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${homeAddress}&mode=${commuteSelected.toLowerCase()}&destinations=${companyAddress}`);
                  const commuteTime = distanceResponse.data.rows[0].elements[0].duration.text;
                  const commuteDistance = distanceResponse.data.rows[0].elements[0].distance.text;
                  return {
                title: jobtitle,
                company,
                address : companyAddress, 
                commuteTime,
                commuteDistance,
                snippet,
                url,
            }

              }
        } catch(err){
                console.log(err);
            }
        });
        return jobArray;
}

exports.Locations = async (input)=>{
  const response = await axios(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_API_KEY}`);
  const results = response.data.predictions;
  return results.map(result=>{
    return result.description;
  });
}
exports.JobTitles = async (input)=>{
  const db = await MongoClient.connect(process.env.MLAB_DB_URL);
  const collection = db.collection('suggestions');
  const results = await collection.find({title: {$regex : '^'+input, $options: 'i'}}).limit(7).toArray();
  return results.map(result=>{
    return result.title;
  });
}
