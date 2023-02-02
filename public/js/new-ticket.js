//HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');


//Client socket
//comes from the library of the html
const socket = io();

//Listeners to events or changes
//This listener helps to know when is connected to the server
socket.on( 'connect', () => {
    btnCreate.disabled = false;
});

//This listener helps to know when is disconnected to the server
socket.on( 'disconnect', () => {
    btnCreate.disabled = true;
});

//Getting the last ticket sent by the server
socket.on( 'last-ticket', ( lastTicket ) => {
    lblNewTicket.innerText = `Ticket ${lastTicket}`;
});

//Adding an event listener to the button
btnCreate.addEventListener( 'click', () => {
    
    //Getting the reference of the ticket sent by the server
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});
