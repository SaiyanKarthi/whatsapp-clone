const mongoose = require("mongoose")

const messageschema = new mongoose.Schema({
    name:String,
    message:String,
    timestamp:String,
    uid:String,
    roomid:String
},
{
  timestamps:true
})

const Messages = mongoose.model("message", messageschema);

module.exports = Messages;