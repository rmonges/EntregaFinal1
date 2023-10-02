export class TicketsManagerMemory {
    constructor(){
        this.tickets = [];
     };
    async get (){
        try {
            return this.tickets;
        } catch (error) {
            throw error;
        }
    };
    
}