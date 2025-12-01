
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../ContextApi/StateProvider'
import "./sidebar.css"
import {DonutLarge, MoreVert, SearchOutlined} from '@mui/icons-material'
import Chat from '../Chat/chat'
import SidebarChat from '../SidebarChat/SidebarChat'
import { initialState } from '../ContextApi/reducer'
import axios from "axios";
import Pusher from "pusher-js";


const Sidebar = () => {
    const [{user}] = useStateValue()
    const [rooms, setsrooms] = useState([])

    useEffect(()=>{
      axios.get("http://localhost:5000/all/rooms").then((response) =>{
          setsrooms(response.data)
      })
    },[]);

    useEffect(()=>{
      const pusher = new Pusher('b55f94ae114c996fdf2',{
      cluster: 'ap2'
      });
      const channel = pusher.subscribe('room');
      channel.bind('inserted', function(room) {
      setsrooms((prevRooms)=>[...prevRooms, room]);
    });
    },[])

  
  return (
  <div className='sidebar'>
        <div className='sidebar_header'>
          <Avatar
          src={user.photoURL}/>
        </div>
        <div className='sidebar_headerRight'>
        <IconButton>
            <DonutLarge/>
       </IconButton>

         {/* <IconButton>
            <Chat/>
       </IconButton> */}

         <IconButton>
            <MoreVert/>
       </IconButton>

        </div>

        <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
                <SearchOutlined/>
                <input placeholder='search or start new chat'/>
            </div>
        </div>
        <div className='sidebar_chats'>
  <SidebarChat addNewChat/>
  {
    rooms.map((room)=>(<SidebarChat key={room._id} id={room._id} name={room.name}/>)
    )
  }
  <SidebarChat/>
  <SidebarChat/>
  <SidebarChat/>
        </div>
    </div>
  )
}

export default Sidebar



