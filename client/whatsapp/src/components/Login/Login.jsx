import {Button} from "@mui/material"
import { auth, provider } from "../../firebox"
import { signInWithPopup } from "firebase/auth"
import "./Login.css"
import { useStateValue } from "../ContextApi/StateProvider"
import { actionTypes } from "../ContextApi/reducer"



const Login = () => {
  const [state, dispatch] = useStateValue()

  console.log(state)
  
const signIn = () => {
signInWithPopup(auth, provider)
.then((result)=>{
   dispatch({
    type:actionTypes.SET_USER,
    user:result.user
   })
}).catch((err)=>{
  alert(err.message)
})
}

  return (
    <div className='login'>
        <div className='login_container'>
            <img 
            src='https://i1.wp.com/www.jacchigua.org/wp-content/uploads/2017/02/whatsapp_logo.png?ssl=1'
            alt='logo'/>
             <div className='login_text'>
                <h1>Sign in to whatsapp</h1>
            </div>
            <Button onClick={signIn}>SIGN IN WITH GOOGLE</Button>
        </div>
    </div>
  )
}

export default Login