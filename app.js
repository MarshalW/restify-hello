'use strict';

const restify = require('restify');
const logger=require('./lib/logger');

require('./lib/db.js');

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
  logger.info('%s listening at %s', server.name, server.url);
});

if(process.env.REDIS_PORT_6379_TCP_PORT && process.env.REDIS_DATABASE){
  logger.info('redis link ok.');
}else{
  logger.info('redis not found.');
}

logger.info('restify server started.');

logger.error('>>>test, it is not a real error');

throw new Error('error!');


