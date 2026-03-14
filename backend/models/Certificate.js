const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

certificateId:String,
studentName:String,
domain:String,
startDate:String,
endDate:String

});

module.exports = mongoose.model("Certificate",certificateSchema);