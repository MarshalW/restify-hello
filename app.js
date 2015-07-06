var restify = require('restify');

function respond(req, res, next) {
  res.send({
  	code:0,
  	name:req.params.name
  });
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});