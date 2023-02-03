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

    //Sending the last four tickets to the client
    socket.emit( 'current-status', ticketControl.lastFourTickets );

    //Getting the next ticket and sending through the callback to the client
    socket.on( 'next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();
        callback( nextTicket );

        //TODO: Notify there is a pending ticket to assign

    });

    /**
     * Serve the next ticket
     * Receives the current window sent by the client
     */
    socket.on( 'serve-ticket', ( { currentWindow }, callback ) => {
        
        //If there is no window in the payload we return an error
        if( !currentWindow ){
            return callback({
                ok: false,
                msg: 'The window is requred'
            });
        }
        
        //Calling the method to serve the next ticket
        const ticket = ticketControl.serveTicket( currentWindow );

        //Sending the last four tickets to the client (in all the public screens)
        socket.broadcast.emit( 'current-status', ticketControl.lastFourTickets );

        //If there is no more tickets to serve then we return an error
        if( !ticket ){
            callback({
                ok: false,
                msg: 'There is no pending tickets'
            });
        }else{
            //If there is pending tickets then we return the current ticket that is being served
            callback({
                ok: true,
                ticket
            });
        }

    });
    
}