import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import axios from "axios";
import { Link } from 'react-router-dom';


const SidebarChat = ({addNewChat, name,id}) => {
    const [seed, setseed] = useState("");
    useEffect(()=>{
     setseed(Math.floor(Math.random()*5000))
    },[])

const createChat = async() => {
  const roomname = prompt("Please enter the name for the group")
  if(roomname){
    try {
      await axios.post("http://localhost:5000/group/create",{
        groupname: roomname
      })
    } catch (error) {
      console.log(error)
    }
  }
}



  return !addNewChat? (
    <Link to={`/rooms/${id}`} className="sidebarchat_link">
    <div className='sidebarchat'>
        <Avatar
        src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}/>
        <div className='sidebarChat_info'>
          <h2>{name}</h2>
        </div>
        </div>
         </Link>
  ):(
    <div className='sidebarchat_info' onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  )
 
}

export default SidebarChat