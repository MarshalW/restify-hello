'use strict';

const fs = require('fs');
const winston=require('winston');
const moment = require('moment');
const _ = require('underscore');
// const globalLogger=require('./logger');

const dateFormat=function() {
	return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};	
// let logger = globalLogger;

// 开发阶段使用的logger
let logger = new (winston.Logger)({
    transports: [
    	new winston.transports.Console({
			timestamp:dateFormat
		})
    ]
});

// 如果有／log目录，说明在docker环境下，创建基于文件的logger
if (fs.existsSync('/log')){
	const loggerTransport=new (winston.transports.File)({
      name: 'db',
      filename: '/log/db.log',
      timestamp:dateFormat,
      level: 'info'
    });
    logger=new (winston.Logger)({
	  // transports:_.union(loggerTransport,globalLogger.sharedTransports)
	  transports:[
	  	loggerTransport
	  ]
	});
}

if(process.env.MONGO_PORT_27017_TCP_ADDR){
  logger.info('mongodb link ok.');
}else{
  logger.info('mongodb not found');
}