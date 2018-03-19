const fetch = require('node-fetch');
const axios = require('axios');
const { filterAsync } = require('node-filter-async');
require('dotenv').config();

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
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_API_KEY}&q=${title}&l=${location}&start=${startingPage}&radius=0&limit=30&format=json&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        const jobArray = [];
        for (let i =0; i < response.data.results.length; i++) {
            const {jobtitle, company, city, state, country, url,latitude, longitude} = response.data.results[i];
            console.log(jobtitle+' at '+company+' in '+city+', '+state);
            const placeResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${company}+" near "+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            const placeArray = placeResponse.data.results;
            if (placeArray.length==1){
                const companyAddress = placeArray[0].vicinity;
                console.log('commute option : '+commuteSelected);
                const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${homeAddress}&mode=${commuteSelected}&destinations=${companyAddress}`);
                const commuteTime = distanceResponse.data.rows[0].elements[0].duration.text;
                const commuteDistance = distanceResponse.data.rows[0].elements[0].distance.text;
                const job = {
                    title: jobtitle,
                    company,
                    address : companyAddress, 
                    commuteTime,
                    commuteDistance,
                    url,
                };
                jobArray.push(job);
            }
        }
        console.log(jobArray);
        return jobArray;
}

