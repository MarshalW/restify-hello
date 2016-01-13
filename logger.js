'use strict';

const fs = require('fs');
const winston=require('winston');

let logger = winston;

// console.log(logger.exceptionHandlers);

// Extend a winston by making it expand errors when passed in as the 
// second argument (the first argument is the log level).
function expandErrors(logger) {
  var oldLogFunc = logger.log;
  logger.log = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= 2 && args[1] instanceof Error) {
      args[1] = args[1].stack;
    }
    return oldLogFunc.apply(this, args);
  };
  return logger;
}

// 如果有／log目录，说明在docker环境下
if (fs.existsSync('/log')){
 //    logger=new (winston.Logger)({
	//   transports: [
	//     new (winston.transports.File)({
	//       name: 'all',
	//       filename: '/log/all.log',
	//       level: 'info'
	//     }),
	//     new (winston.transports.File)({
	//       name: 'error',
	//       filename: '/log/error.log',
	//       level: 'error'
	//     })
	//   ]
	// });
	// winston.add(winston.transports.File, {
	//     filename: '/log/all.log',
	//     level: 'info'
	// });

	// winston.add(winston.transports.File, {
	//     filename: '/log/error.log',
	//     level: 'error'
	// });

	winston.add(
	    new (winston.transports.File)({
	      name: 'all',
	      filename: '/log/all.log',
	      level: 'info'
	    }),
	    {},
	    true
	);

	winston.add(
	    new (winston.transports.File)({
	      name: 'error',
	      filename: '/log/error.log',
	      level: 'error'
	    }),
	    {},
	    true
	);

	logger.handleExceptions(new winston.transports.File({ filename: '/log/crash.log'}));

	// logger=expandErrors(logger);
}

module.exports=expandErrors(logger);
// module.exports=logger;
