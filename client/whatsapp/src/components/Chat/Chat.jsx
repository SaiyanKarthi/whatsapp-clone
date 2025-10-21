import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import { initialState } from '../ContextApi/reducer';
import axios from "axios";
import { useStateValue } from '../ContextApi/StateProvider';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';




const Chat = () => {

    const [seed, setseed] = useState("");
    const [input,setInput] = useState("");
    const [Roomname, setRoomname] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [{user}] = useStateValue();
    const {roomid} = useParams();
    const [messages, setmessages] = useState([]);

        useEffect(()=>{
          if(roomid){
            axios.get(`http://localhost:5000/room/${roomid}`).then((response)=>{
              setRoomname(response.data.name);
              setUpdatedAt(response.data.updatedAt);
            })
            axios.get(`http://localhost:5000/messages/${roomid}`).then((response)=>{
              setmessages(response.data)
            })
          }
        },[roomid])
        
        useEffect(()=>{
         setseed(Math.floor(Math.random()*5000))
        },[roomid])
 
    // useEffect(()=>{
    //   const pusher = new Pusher('b55f94ae114c996fdf2',{
    //   cluster: 'ap2'
    //   });
    //   const channel = pusher.subscribe('messages');
    //   channel.bind('inserted', function(messages) {
    //   setmessages((prevMessages)=>[...prevMessages, messages]);
    // });
    // },[roomid])


    useEffect(() => {
  const pusher = new Pusher('b55f94ae114c996fdf2', {
    cluster: 'ap2',
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', function (newMessage) {
    if (newMessage.roomid === roomid) {
      setmessages((prevMessages) => [...prevMessages, newMessage]);
    }
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, [roomid]);



    const Sendmessage = async(e) =>{
      e.preventDefault();
      if(!input){
        return;
      }
      await axios.post("http://localhost:5000/messages/new",{
        message:input,
        name:user.display,
        timestamp:new Date(),
        uid:user.uid,
        roomid: roomid,

      });
      setInput("")
    }    


  return (
    <div className='chat'>
        <div className='chat_header'>
           <Avatar src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}/>

             <div className='chat_headerInfo'>
            <h3> {Roomname?Roomname:"Welcome to whatsapp"}</h3>
            <p>
              {updatedAt
              ?`last updated at ${new Date(updatedAt).toString().slice(0,25)}`
              :"Click on anygroup"}</p>
           </div>

           <div className='chat_hightRight'>
            <IconButton>
                <SearchOutlined/>
            </IconButton>

             <IconButton>
                <AttachFile/>
            </IconButton>

             <IconButton>
                <MoreVert/>
            </IconButton>
           </div>
        </div> 

        <div className='chat_body'> 
          {
        messages.map((message,index)=>(
          <p className={`chat_message ${message.uid === user.uid && "chat_receiver"}`} key={index}>
              <span className='chat_name'> {message.name}</span>
              {message.message}
              <span className='chat_timestamp'>
                {new Date(message.timestamp).toString().slice(0,25)}
              </span>
              </p>
        ))
      }
      </div>

         <div className='chat_footer'>
         <InsertEmoticon/>
         <form>
          <input placeholder='Type a message'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            />
          <button onClick={Sendmessage}>Send a message</button>
         </form>
         </div>
    </div>
    
  )
}

export default Chat