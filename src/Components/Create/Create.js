import React, { Fragment,useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { collection,getFirestore,doc,setDoc } from "firebase/firestore"; 
import {FirebaseContext,AuthContext} from './../../store/FirebaseContext'
import './Create.css';
import Header from '../Header/Header';
const Create = () => {
  
  const [name,setname] = useState('')
  const [category,setcategory] = useState('')
  const [price, setprice] = useState('')
  const [image, setimage] = useState(null)
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
 const firestore=getFirestore(firebase)
 const date = new Date().toDateString();
 const navigate=useNavigate()

  
 const handleSubmit= async()=>{
  if (!image) {
    alert("Please select an image");
    return;
  }
  try{
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);
    const snapshot=await uploadBytes(storageRef, image)
    const imageURL = await getDownloadURL(snapshot.ref);
    const productsCollection = collection(firestore, "products");
    await setDoc(doc(productsCollection), {
     name,
     category,
     price,
     imageURL,
     createdAt:date.toString(),
     userId:user.uid
    });
    console.log("let going to navigate")
    navigate("/");
  }catch (error) {
    console.error("Error uploading image or saving product:", error);
  }

}

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
            value={name}
            onChange={(e)=>setname(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
            value={category}
            onChange={(e)=>setcategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>setprice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):null}></img>
       
            <br />
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;