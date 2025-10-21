
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBlNFuVQD9sRt5ancn8S3EeIkcuRoJb3QQ",
  authDomain: "mern-whatsapp-7b30f.firebaseapp.com",
  projectId: "mern-whatsapp-7b30f",
  storageBucket: "mern-whatsapp-7b30f.firebasestorage.app",
  messagingSenderId: "96824971367",
  appId: "1:96824971367:web:e01cce6d90004c317d84c2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export{app, auth, provider}