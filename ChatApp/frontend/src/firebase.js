import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyBF6O8WUfHxHh5-Dw8GbDe6S4_WYrkgM78",
    authDomain: "whatsapp-clone-54985.firebaseapp.com",
    projectId: "whatsapp-clone-54985",
    storageBucket: "whatsapp-clone-54985.appspot.com",
    messagingSenderId: "896887407326",
    appId: "1:896887407326:web:fe1aeb4515ab9358bbb84f",
    measurementId: "G-50CGP4KSP3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;