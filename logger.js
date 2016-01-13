'use strict';

const fs = require('fs');
const winston=require('winston');
const moment = require('moment');
const stackTrace = require('stack-trace');

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

// logger.handleExceptions(new winston.transports.File({ filename: 'crash.log'}));

// logger.on('error', function (err) { 
// 	console.log('>>>>>>发生了没有捕获的异常！');
// });
// logger.emitErrs = false;

// process.on('uncaughtException', function(err) {
// 	var trace = stackTrace.parse(err);
// 	logger.error('>>>>>>崩溃了: '+err.stack+'<<<');
// 	process.nextTick(function(){
// 		process.exit(1);
// 	});
// });

