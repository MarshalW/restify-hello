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

// 临时的代码，后面用代理模式替代
logger={
	logger:logger,
	info:function(msg){
		this.logger.info(msg);
	},
	error:function(msg){
		var cellSite=stackTrace.get()[1];
		this.logger.error(msg,{filePath:cellSite.getFileName(),lineNumber:cellSite.getLineNumber()});
	}
}

module.exports=logger;

var hello = function(name) { return "hello: " + name; };
hello = _.wrap(hello, function(func) {
  return "before, " + func("moe") + ", after";
});

