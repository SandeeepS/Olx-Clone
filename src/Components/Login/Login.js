import React,{useState,useContext} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {FirebaseContext} from '../../store/FirebaseContext'
import {useNavigate,Link} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const auth = getAuth();
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setpassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const handleLogin=(e)=>{
e.preventDefault();
signInWithEmailAndPassword(auth, email, password)
.then(() => {
  navigate('/')
 })
 .catch((error) => {
   const errorMessage = error.message;
   console.log(error.code,errorMessage);
   alert('Invalid Credentials');
 });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;