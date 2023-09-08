import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx1FfXEdvJkPymFDneOn8_tnlfmXImrnM",
  authDomain: "netflix-clone-39fd9.firebaseapp.com",
  projectId: "netflix-clone-39fd9",
  storageBucket: "netflix-clone-39fd9.appspot.com",
  messagingSenderId: "735622391792",
  appId: "1:735622391792:web:2562a6c3faad9d4f7f5f35"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();

const auth=firebase.auth();

export {auth}
export default db;