'use strict';

const fs = require('fs');
const winston=require('winston');

let logger = winston;


// 如果有／log目录，说明在docker环境下
if (fs.existsSync('/log')){
    logger=new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({
	      name: 'all',
	      filename: 'all.log',
	      level: 'info'
	    }),
	    new (winston.transports.File)({
	      name: 'error',
	      filename: 'error.log',
	      level: 'error'
	    })
	  ]
	});

}


module.exports=logger;
