var http = require('http');
http.createServer(function (req, res) {
    res.write('Hello word');
    res.end();
}).listen(8080);