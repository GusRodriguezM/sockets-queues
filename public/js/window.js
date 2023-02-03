//HTML References
const lblWindow = document.querySelector('h1');
const btnServeTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

//Getting the params from the url
const searchParams = new URLSearchParams( window.location.search );

//If the params does not have the word window then redirect to the index.html
if( !searchParams.has( 'window' ) ){
    window.location = 'index.html';
    throw new Error('The window is required');
}

//Get the word from the params
const currentWindow = searchParams.get( 'window' );
lblWindow.innerText = currentWindow;

divAlert.style.display = 'none';

//Client socket
//comes from the library of the html
const socket = io();

//Listeners to events or changes
//This listener helps to know when is connected to the server
socket.on( 'connect', () => {
    btnServeTicket.disabled = false;
});

//This listener helps to know when is disconnected to the server
socket.on( 'disconnect', () => {
    btnServeTicket.disabled = true;
});

//Getting the last ticket sent by the server
socket.on( 'last-ticket', ( lastTicket ) => {
    // lblNewTicket.innerText = `Ticket ${lastTicket}`;
});

//Getting the number of pendin tickes to show in the screen to assign tickets
socket.on( 'pending-tickets', ( pendingTickets ) => {
    if( pendingTickets === 0 ){
        lblPending.style.display = 'none';    
    }else{
        lblPending.style.display = '';    
        lblPending.innerText = pendingTickets;
    }
});

//Adding an event listener to the button
btnServeTicket.addEventListener( 'click', () => {

    //Here we ask the server to send the next ticket (in the payload) to attend in the current window
    socket.emit( 'serve-ticket', { currentWindow }, ( { ok, ticket} ) => {
        
        //In the callback we receive the ticket and the ok
        //If ok is false it means that there is no more tickets
        if( !ok ){
            lblTicket.innerText = 'No one';
            return divAlert.style.display = '';
        }

        //If there is more tickets we show them in the label
        lblTicket.innerText = `Ticket ${ticket.number}`;

    });
    
    //Getting the reference of the ticket sent by the server
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    // });

});