const http = require('http');
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost";
const app = require('../server');

const server = http.createServer(app);


const onListening = ()=>{
    console.log(`listening on ${HOST}:${PORT}`);
};
const onError = (error)=>{
    console.error(error);
}
server.listen(PORT);
server.on('listening', onListening);
server.on('error', onError);