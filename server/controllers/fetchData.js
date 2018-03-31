const axios = require('axios');
const { filterAsync } = require('node-filter-async');
const MongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV=='development') {
   require('dotenv').config(); 
}
exports.IndeedJobs = async ({title, homeAddress,city,state,commuteSelected})=>{
        const location = city+', '+state;
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_API_KEY}&q=${title}&l=${location}&start=0&radius=0&limit=30&format=json&highlight=0&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        const results = await filterAsync(response.data.results, async({company, city, state, country,latitude, longitude})=>{
            const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${company}+in+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            return (googleResponse.data.results.length == 1);
        });
        const jobArray =  await results.map(async ({jobtitle, company, city, state, country,snippet, url,latitude, longitude})=>{
            try {
              const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${company}+in+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
              if (googleResponse.data.results.length == 1) {
                  const companyAddress = googleResponse.data.results[0].formatted_address;
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
