import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { socketController } from '../sockets/controller.js';

class ServerSocket {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.io = new Server( this.server );

        this.paths = {}

        //Middlewares
        this.middlewares();

        //App routes
        this.routes();

        //Sockets events
        this.sockets();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Public folder
        this.app.use( express.static('public') );

    }

    //App routes
    routes() {}

    //Sockets
    sockets() {
        //this.io references the server of the sockets
        this.io.on( 'connection',  socketController );
    }

    //Port where the app will run
    listen() {
        this.server.listen(this.port, () => {
            console.log(`The server is up and listening on port, ${this.port}`);
        });
    }

}

export default ServerSocket;