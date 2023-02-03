//HTML References
const lblTicket1 = document.querySelector('#lblTicket1');
const lblWindow1 = document.querySelector('#lblWindow1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblWindow2 = document.querySelector('#lblWindow2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblWindow3 = document.querySelector('#lblWindow3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblWindow4 = document.querySelector('#lblWindow4');

//Client socket
const socket = io();

//Getting the current status of the last four tickets and showing them in the html file
socket.on( 'current-status', ( payload ) => {
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ){
        lblTicket1.innerText = `Ticket ${ticket1.number}`;
        lblWindow1.innerText = ticket1.window;
    }

    if( ticket2 ){
        lblTicket2.innerText = `Ticket ${ticket2.number}`;
        lblWindow2.innerText = ticket2.window;
    }

    if( ticket3 ){
        lblTicket3.innerText = `Ticket ${ticket3.number}`;
        lblWindow3.innerText = ticket3.window;
    }

    if( ticket4 ){
        lblTicket4.innerText = `Ticket ${ticket4.number}`;
        lblWindow4.innerText = ticket4.window;
    }

});