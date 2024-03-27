import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqq6xK0kOQqtl_wQUVhoALPqRAuy0Q9O0",
  authDomain: "olx-clone-dd95f.firebaseapp.com",
  projectId: "olx-clone-dd95f",
  storageBucket: "olx-clone-dd95f.appspot.com",
  messagingSenderId: "870991037320",
  appId: "1:870991037320:web:1c04736a08928f7752f03d",
  measurementId: "G-SNV5NG454W"
};
  const firebase= initializeApp(firebaseConfig);


export { firebase };