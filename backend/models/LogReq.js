import mongoose from "mongoose";

const logReqSchema = new mongoose.Schema({

    inputText:      {type:String, required: true},
    country:        {type:String, required: true},
    translatedText: {type:String, required: true},
    clickedCountry: {type:String},
    countryCode:    {type:String, required: true}

},{timestamps: true})

const LogReq = mongoose.model("logReq", logReqSchema)
export default LogReq


// check the country thats clicked and the input text. 