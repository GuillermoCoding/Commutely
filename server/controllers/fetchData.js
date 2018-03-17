const fetch = require('node-fetch');
const axios = require('axios');
const { filterAsync } = require('node-filter-async');
require('dotenv').config();

exports.IndeedJobs = async (args)=>{
        const {
            title,
			zipcode,
            startingPage,
            lat,
            lng,
            commuteSelected,
            timeSelected,
        } = args;
        console.log(title);
        console.log(zipcode);
        console.log(startingPage);
        console.log(lat);
        console.log(lng);
        console.log(commuteSelected);
        console.log(timeSelected);
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_API_KEY}&q=${title}&l=${zipcode}&start=${startingPage}&radius=1000&limit=30&format=json&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        console.log("indeed results : "+response.data.results.length);
        const filteredResponse = await filterAsync(response.data.results, async ({jobtitle, company, city, state, country, url,latitude, longitude})=>{
            const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${company}+" near "+${city}+${state}&key=${process.env.GOOGLE_API_KEY}`);
            const resultArray = googleResponse.data.results;
            // console.log("For "+company+" location in "+city+", "+state);
            // console.log("We found "+resultArray.length+" options using the google places API");
            // for (let i=0; i < resultArray.length; i++){
            //     console.log("Option "+i+1);
            //     console.log("lat : "+resultArray[i].geometry.location.lat);
            //     console.log("lng : "+resultArray[i].geometry.location.lng);
            //     console.log("address : "+resultArray[i].vicinity);
            // }  
            // console.log("");
            return resultArray.length==1;
        });

        return filteredResponse.map(({jobtitle, company, city, state, country, url,latitude, longitude})=>{
            console.log(jobtitle+" "+company+" "+city);
            return {
                title:jobtitle,
                company,
                city,
                state,
                country,
                url,
                latitude,
            }
        });;
        // return response.data.results.map(async ({jobtitle, company, city, state, country, url,latitude, longitude})=>{
        //     const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${company}+" near "+${city}+${state}&key=AIzaSyBnp1h3w4i_vl0lfAviFRZ546RJS65fYw8`);
        //     console.log(googleResponse.data.results.length);
        //     const resultArray = googleResponse.data.results;
        //      if (resultArray.length==1) {
        //         return {
        //             title: jobtitle,
        //             company,
        //             city,
        //             state,
        //             country,
        //             url,
        //             latitude,
        //             longitude
        //         }
        //     }else {
        //         return {
        //             title: jobtitle,
        //             company,
        //             city,
        //             state,
        //             country,
        //             url,
        //             latitude,
        //             longitude
        //         }
        //     }
        // });



        //    console.log("For "+company+" location in "+city+", "+state);
        //    console.log("We found "+resultArray.length+" options using the google places API");
        //    for (let i=0; i < resultArray.length; i++){
        //     console.log("Option "+i+1);
        //     console.log("lat : "+resultArray[i].geometry.location.lat);
        //     console.log("lng : "+resultArray[i].geometry.location.lng);
        //     console.log("address : "+resultArray[i].vicinity);
        //    }  
        //    console.log("");
}

