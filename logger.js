'use strict';

const fs = require('fs');
const winston=require('winston');
const moment = require('moment');
const stackTrace = require('stack-trace');
const _=require('underscore');

const dateFormat=function() {
	return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};	

let logger = new (winston.Logger)({
    transports: [
      new winston.transports.Console({
      	timestamp:dateFormat
      })
    ]
});

// 如果有／log目录，说明在docker环境下
if (fs.existsSync('/log')){
    logger=new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({
	      name: 'all',
	      filename: '/log/all.log',
	      timestamp:dateFormat,
	      level: 'info'
	    }),
	    new (winston.transports.File)({
	      name: 'error',
	      filename: '/log/error.log',
	      timestamp:dateFormat,
	      level: 'error'
	    })
	  ]
	});

	const crachLogger= new (winston.Logger)({
    	transports: [
	      	new (winston.transports.File)({
		      name: 'error',
		      filename: '/log/crash.log',
		      level: 'error',
		      handleExceptions: true,
      		  timestamp:dateFormat,
      		  humanReadableUnhandledException: true,
      		  json: false      		
		    })
	    ]
	});
}

// 代理logger.error方法，加入文件路径和行号信息
var originalMethod=logger.error;
logger.error=function(){
	var cellSite=stackTrace.get()[1];
	originalMethod.apply(logger,[arguments[0]+'\n',{filePath:cellSite.getFileName(),lineNumber:cellSite.getLineNumber()}]);
}

module.exports=logger;

