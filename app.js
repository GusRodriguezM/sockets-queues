import * as dotenv from 'dotenv';
dotenv.config();
import ServerSocket from "./models/server.js";

//Instance of the class server
const server = new ServerSocket();

server.listen();
