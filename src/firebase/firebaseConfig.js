import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQx455SQE0wYZSk3pYLkHtAu-oqNRC010",
  authDomain: "react-blog-95e89.firebaseapp.com",
  projectId: "react-blog-95e89",
  storageBucket: "react-blog-95e89.appspot.com",
  messagingSenderId: "720359914168",
  appId: "1:720359914168:web:cf41d25849f6ecc154d24d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { database as default, googleAuthProvider, firebase };
