const fetch = require('node-fetch');
const axios = require('axios');

exports.IndeedJobs = async (title,zipcode,startingPage)=>{
        const indeedUrl = `http://api.indeed.com/ads/apisearch?publisher=964453866194441&q=${title}&l=${zipcode}&start=${startingPage}&format=json&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`;
        const response = await axios.get(indeedUrl);
        return response.data.results.map(({jobtitle, company, city, state, country, url})=>{
            return {
                title: jobtitle,
                company,
                city,
                state,
                country,
                url
            }
        });
        
}

