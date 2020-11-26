const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./app')

const PORT = 3000

if (cluster.isMaster) {

    //Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {
    console.log(`Worker ${process.pid} started`);
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} `))
}


//module.exports = defineClusters

