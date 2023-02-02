import TicketControl from "../models/ticket-control.js";

//Instance of the class TicketControl
const ticketControl = new TicketControl();

//Controller of the socket
export const socketController = ( socket ) => {

    socket.on( 'disconnect', () => {
        console.log('Client disconnected...', socket.id);
    });

    //Sending the last ticket to the client
    socket.emit( 'last-ticket', ticketControl.lastTicket );

    //Getting the next ticket and sending through the callback to the client
    socket.on( 'next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();
        callback( nextTicket );

        //TODO: Notify there is a pending ticket to assign

    });
    
}