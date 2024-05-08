import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC90TgzGCTcaDdRKKgejrfal_53dRn8lwE",
  authDomain: "olxclone-b0aca.firebaseapp.com",
  projectId: "olxclone-b0aca",
  storageBucket: "olxclone-b0aca.appspot.com",
  messagingSenderId: "367491367373",
  appId: "1:367491367373:web:f6079bf57d7131416e0484",
  measurementId: "G-3JJNRVB9G3"
};

  const firebase= initializeApp(firebaseConfig);

export { firebase };