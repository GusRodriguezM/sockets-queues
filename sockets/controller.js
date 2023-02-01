import TicketControl from "../models/ticket-control.js";

const ticketControl = new TicketControl();

export const socketController = ( socket ) => {

    socket.on( 'disconnect', () => {
        console.log('Client disconnected...', socket.id);
    });

    /**
     * This listens when a client emits a message and the callback is the things we want to do when the client emits the message
     * The first arg of the callback is the payload
     * Th second arg is a callback where we can send data to the client
     */
    socket.on( 'send-message', ( payload, callback ) => {

        // console.log('Message from the "client" received: ', payload);
        
        const id = '123ABC';
        callback( id );
        
        //Sending a message to all the connected clients
        socket.broadcast.emit( 'send-message', payload );

    });
    
}