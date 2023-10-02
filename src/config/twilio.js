import twilio from "twilio";

const twilioAccountId ="AC5449f61118d6c4e7f19d2ece3bcd8f40";

const twilioAccountToken ="4baf81f6c0a6cd6bdb14849910c68509";
const twilioPhone ="+12563056902" ;

//creamos cliente para conectar con twilio
const twilioClient =twilio(twilioAccountId,twilioAccountToken);

export {twilioClient, twilioPhone};