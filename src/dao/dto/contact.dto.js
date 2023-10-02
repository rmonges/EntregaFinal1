export class ContactDto {
    constructor(contact){
        this.name = contact.name;
        this.lastname = contact.lastname;
        this.fullname = `${contact.name} ${contact.lastname}`;
        this.email = contact.email
        
    };
}