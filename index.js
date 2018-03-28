const app = require('./server/server');
const port = process.env.PORT || 4000;

app.listen(port,function(){
  console.log('application running on port ::'+port);
});
