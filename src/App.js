import React,{useEffect,useContext,createContext,useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const PostContext = createContext(null);
function App() {
  const {user,setUser}=useContext(AuthContext)
  const auth = getAuth();
  const [postDetails, setPostDetails] = useState();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user,'s');
      } 
    });  
  }, [auth, setUser])
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
    <div className="App">
      <Router>
      <Routes>
         <Route path="/" element={<Home />}  />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </div>
    </PostContext.Provider>
  );
}

export default App;