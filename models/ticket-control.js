import path from 'path';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import data from "../db/data.json" assert { type: "json" };

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

//Model to create the tickets
class Ticket {
    constructor( number, window ) {
        this.number = number;
        this.window = window;
    }
}

//Class to control the creation of the tickets
class TicketControl {

    constructor() {
        //The last ticket to serve
        this.lastTicket = 0;
        //Date to compare if the data is the same of what is stored is the same
        this.today = new Date().getDate();
        //All the pending tickets
        this.tickets = [];
        //The last four tickets from the array of tickets
        this.lastFourTickets = [];

        this.init();
    }

    //Generates the data to store in the JSON file
    get toJson() {
        return {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        }
    }

    //Initialize the class
    init() {
        const { lastTicket, today, tickets, lastFourTickets } = data;

        //If it's the same day then just assign the values (from the json file) to the class properties
        if( today === this.today ){
            this.tickets = tickets;
            this.lastTicket = lastTicket;
            this.lastFourTickets = lastFourTickets;
        }else{ //If it's another day then save the variables to the database
            this.saveToDB();
        }
    }

    //Save to the database
    saveToDB() {
        //Get the path from the json file
        const dbPath = path.join( __dirname, '../db/data.json' );
        //Write the data into the json file
        writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }

    /**
     * This method will create a new ticket, add it to the array of tickets and then saving the tickets to the database
     * @returns the new ticket
     */
    nextTicket() {
        this.lastTicket += 1;
        const ticket = new Ticket( this.lastTicket, null );
        this.tickets.push( ticket );

        this.saveToDB();

        return `Ticket ${ticket.number}`;
    }

    /**
     * @param {Number} window The number of the window whom will attend the current ticket
     * @returns null if there is no tickets in the array of tickets or the ticket is serving the window (from the arg)
     */
    serveTicket( window ) {

        //If there is no tickets return null
        if( this.tickets.length === 0 ){
            return null;
        }

        //Removes the first ticket from the array
        const ticket = this.tickets.shift();
        //Assigns the number of the window to the property window from the Ticket class
        ticket.window = window;

        //Add the ticket to the begin of the array of four tickets (this array will be showed in the screen)
        this.lastFourTickets.unshift( ticket );

        //If the length of the array of four tickets is greater than four then delete the last ticket
        if( this.lastFourTickets.length > 4 ){
            this.lastFourTickets.splice( -1, 1 );
        }

        //Save the ticket to the file
        this.saveToDB();

        //Returns the curren serving ticket
        return ticket;

    }


}

export default TicketControl;