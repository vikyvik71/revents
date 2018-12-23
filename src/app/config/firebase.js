import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBIKo97czUOucvNTCy3wVL0RJ8DGgaGNhs",
    authDomain: "revents-b864d.firebaseapp.com",
    databaseURL: "https://revents-b864d.firebaseio.com",
    projectId: "revents-b864d",
    storageBucket: "",
    messagingSenderId: "861588841855"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;