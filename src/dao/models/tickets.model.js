import mongoose from "mongoose";

const ticketsCollections = "tickets";

const ticketsSchema = new mongoose.Schema({

    code:{
        type:String, 
        require:true
       },
    purchase_datetime: Date,
    amount:{
        type: Number, 
        require:true,
    },
    purcharser:String,

});

export const ticketsModel = mongoose.model(ticketsCollections, ticketsSchema);
