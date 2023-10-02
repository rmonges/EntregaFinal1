import mongoose from "mongoose";

const contactsCollection = "contacts";

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    lastname:{
        type: String,
        require:true
    },
    fullname:{
        type: String,
        require:true
    },
    email:{
        type: String, 
        require:true,
        unique: true
    }
});

export const contactsModel = mongoose.model(contactsCollection, contactSchema);
