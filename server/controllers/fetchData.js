const fetch = require('node-fetch');
const axios = require('axios');
const { filterAsync } = require('node-filter-async');

if (process.env.NODE_ENV=='development') {
   require('dotenv').config(); 
}

exports.IndeedJobs = async (args)=>{
        const {
            title,
            homeAddress,
            city,
            state,
            commuteSelected,
            timeSelected,
            startingPage,
        } = args;
        const location = city+', '+state;
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_API_KEY}&q=${title}&l=${location}&start=${startingPage}&radius=0&limit=30&format=json&highlight=0&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        const results = await filterAsync(response.data.results, async({company, city, state, country,latitude, longitude})=>{
            const placeResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20&keyword=${company}+" in "+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            return (placeResponse.data.results.length == 1);
        });
        const jobArray =  await results.map(async ({jobtitle, company, city, state, country,snippet, url,latitude, longitude})=>{
            try {
            const placeResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20&keyword=${company}+" in "+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            const placeArray = placeResponse.data.results;
            const companyAddress = placeArray[0].vicinity;
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
        } catch(err){
                console.log(err);
            }
        });
        return jobArray;
}

