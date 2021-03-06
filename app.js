var restify = require('restify');
var winston = require('winston');
var fs = require('fs');

if (fs.existsSync('/log')){
     winston.add(winston.transports.File, { filename: '/log/app.log'});
     console.log('set log file path ok!');
}

function respond(req, res, next) {
  res.send({
  	code:0,
  	name:req.params.name
  });
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

if(process.env.REDIS_PORT_6379_TCP_PORT && process.env.REDIS_DATABASE){
  console.log('redis link ok.');
}else{
  console.log('redis not found.');
}

if(process.env.MONGO_PORT_27017_TCP_ADDR){
  console.log('mongodb link ok.');
}else{
  console.log('mongodb not found');
}

winston.info('Hello again distributed logs');
