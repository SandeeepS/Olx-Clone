import React,{useState,useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { collection,getFirestore,doc,setDoc } from "firebase/firestore"; 
import {useNavigate,Link} from 'react-router-dom'

export default function Signup() {
  const [userName,setUserName]= useState('')
  const [email,setEmail]= useState('')
  const [phone,setPhone]= useState('')
  const [password,setPassword]= useState('')
 const {firebase}=useContext(FirebaseContext)
 const auth = getAuth();
 const db=getFirestore(firebase)
 const navigate=useNavigate()

 const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
  const result=await createUserWithEmailAndPassword(auth, email, password)
  const user = result.user;
  await updateProfile(user, { displayName: userName });
    console.log(user, 'user');
  const usersCollection = collection(db,'users');
  console.log("mukalk");
  await setDoc(doc(usersCollection, result.user.uid), {
    id: result.user.uid,
    userDisplay: userName,
    email: email,
    phone: phone
  })
  console.log("thazhey");

  navigate('/login');
 } catch (error) {
    console.error('error', error);
    const errorCode = error.code;
    let errorMessage = "An error occurred.";

    if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address.";
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Email is already in use. Please use a different email.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password is too weak. Use atleast length of 6.";
    }
  
    toast.error(errorMessage);
  }
  
 }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}

          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}

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
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
        <ToastContainer />
      </div>
    </div>
  );
}