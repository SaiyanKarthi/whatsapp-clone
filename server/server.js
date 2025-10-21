// mongodb+srv://<db_username>:<db_password>@streamapps.raohcf2.mongodb.net/
const express = require("express")
const mongoose = require("mongoose")
const Rooms = require("./dbRoom")
const cors = require("cors")
const Messages = require("./dbMessage")
const Pusher = require("pusher");


const app = express()


const pusher = new Pusher({
  appId: "2066292",
  key: "61b5bdf999037fc95914",
  secret: "dafcad1793f56f0b29b9",
  cluster: "ap2",
  useTLS: true
});

app.use(cors())
app.use(express.json())

const dburl = "mongodb+srv://karthi:karthi@whatsapp.bupyqpg.mongodb.net/whatsapp"

mongoose.connect(dburl);

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("DB Connected")

    const roomcollection = db.collection("rooms");
    const changestream = roomcollection.watch();
   
    changestream.on("change", (change) => {
      console.log(change)
      if(change.operationType === "insert"){
      const roomDetails = change.fullDocument;
      pusher.trigger("room","inserted",roomDetails)
     }
     else{
      console.log("Not expected event to trigger");
     }
    });

    const msgcollection = db.collection("messages");
    const changestream1 = msgcollection.watch();
   
    changestream1.on("change", (change) => {
     if(change.operationType === "insert"){
      const messageDetails = change.fullDocument;
      pusher.trigger("messages","inserted",messageDetails)
     }
     else{
      console.log("Not expected event to trigger");
     }
});
});

app.get("/", (req, res) =>{
    res.send("Hello! from backend")
})
// this is older version
// app.post("/group/create",(req,res) =>{
//     const name = req.body.groupname;
//     Rooms.create({name},(err,data)=>{
//         if(err){
//             return res.status(500).send(err)
//         }
//         else{
//             return res.status(201).send(data)
//         }
//     })
// })


app.post("/group/create", async (req, res) => {
  const name = req.body.groupname;
  try {
    const data = await Rooms.create({ name });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.post("/messages/new",async(req,res)=>{
    const dbmessage = req.body;
    // console.log("Incoming message:", dbmessage);
    try {
        const message = await Messages.create(dbmessage)
        res.status(201).send(message)
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.get("/all/rooms",async(req,res) =>{

  try {
  const room = await Rooms.find()
  res.status(201).send(room)
  } catch (err) {
    return res.status(500).send(err)
  }
})


app.get("/room/:id",async(req, res) =>{
 try {
  const ids = await Rooms.find({_id:req.params.id})
  res.status(201).send(ids[0])
 } catch (err) {
  return res.status(500).send(err)
 }
})


app.get("/messages/:id",async(req,res)=>{

  try {
    const messagesroom = await Messages.find({roomid:req.params.id})
    res.status(201).send(messagesroom)
  } catch (error) {
     return res.status(500).send(err)
  }
})




app.listen(5000,()=>{
    console.log("server is running @5000")
})