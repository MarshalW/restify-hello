'use strict';

const logger=require('./logger').dbLogger;

if(process.env.MONGO_PORT_27017_TCP_ADDR){
  logger.info('mongodb link ok.');
}else{
  logger.info('mongodb not found');
}

logger.error('====>>>>test db error');