const mongoose = require("mongoose")

const roomschema = new mongoose.Schema(
    {
        name:String,
    },{
       timestamps:true,
    }
);
const Rooms = mongoose.model("rooms",roomschema);

module.exports = Rooms;