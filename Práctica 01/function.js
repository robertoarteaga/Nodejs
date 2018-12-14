var http = require('http');
var server = http.createServer();
function control(petic, resp) {
	resp.write("Hola mundo");
	resp.end();
}
server.on('request', control);
server.listen(3000);