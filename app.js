'use strict';

const restify = require('restify');
const winston = require('winston');
const fs = require('fs');

// 如果有／log目录，说明在docker环境下
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

const server = restify.createServer();
server.get('/hello/:name', respond);

server.listen(3000, function() {
  winston.info('%s listening at %s', server.name, server.url);
});

if(process.env.REDIS_PORT_6379_TCP_PORT && process.env.REDIS_DATABASE){
  winston.info('redis link ok.');
}else{
  winston.info('redis not found.');
}

if(process.env.MONGO_PORT_27017_TCP_ADDR){
  winston.info('mongodb link ok.');
}else{
  winston.info('mongodb not found');
}

winston.info('restify server started.');



