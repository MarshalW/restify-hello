'use strict';

const fs = require('fs');
const winston=require('winston');

var stackTrace = require('stack-trace');

let logger = winston;

// 如果有／log目录，说明在docker环境下
if (fs.existsSync('/log')){
    logger=new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({
	      name: 'all',
	      filename: '/log/all.log',
	      level: 'info'
	    }),
	    new (winston.transports.File)({
	      name: 'error',
	      filename: '/log/error.log',
	      level: 'error'
	    })
	  ]
	});

	// logger.handleExceptions(new winston.transports.File({ filename: '/log/crash.log'}));

	// logger.on('error', function (err) { 
	// 	console.log('发生了没有捕获的异常！');
	// });

	logger.on('logging', function (transport, level, msg, meta) {
		// if(level==='error'){
		// 	meta.error={
		// 		fileName:
		// 	}
		// }
		// var trace = stackTrace.get();
		var trace = stackTrace.get();
		meta.fileName=trace[1].getFileName();
		meta.lineNumber=trace[1].getLineNumber();
	});
}

module.exports=logger;
