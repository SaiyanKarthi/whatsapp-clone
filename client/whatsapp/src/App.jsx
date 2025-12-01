
import {  BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css'

import { useStateValue } from './components/ContextApi/StateProvider'
import Login from './components/Login/Login.jsx'
import Chat from './components/Chat/Chat.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'


const App =()=> {
  
const [{user}] = useStateValue()
  return (
    
     <div className='app'> 
      {!user ? 
        <Login/>:
      <div className='app_body'>
      <Router>
        <Sidebar/>
       <Routes>
        <Route path = "/" element={<Chat/>}/>
        <Route path = "/rooms/:roomid" element={<Chat/>}/>
      </Routes>
    </Router>
      </div>
        }
     </div>
  )
}
export default App
