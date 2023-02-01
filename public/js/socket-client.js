
//HTML References
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');

//Client socket
//comes from the library of the html
const socket = io();


//Listeners to events or changes
//.on is for listening an event
//This listener helps to know when is connected to the server
socket.on( 'connect', () => {
    console.log('Client: connected to the server');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

//This listener helps to know when is disconnected to the server
socket.on( 'disconnect', () => {
    console.log('Client: disconnected');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

//Listening the message from the server
//Also we can use the payload sent by the server
socket.on( 'send-message', ( payload ) => {
    console.log('Listening the message from the server: ', payload);
});

//Adding an event listener to the button
btnEnviar.addEventListener( 'click', () => {
    const message = txtMessage.value;

    //Usually objects are send to be more efficient the communication
    const payload = {
        id: '123ABC',
        message,
        date: new Date().getTime()
    };
    
    //.emit helps to send (emit) an event
    //sending a message to the server
    //The third arg is a callback where we get the data sent by the server
    socket.emit( 'send-message', payload, ( id ) => {
        console.log('From the server: ', id);
    });

});
