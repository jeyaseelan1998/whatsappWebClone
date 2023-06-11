import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, serverTimestamp} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIQdFDs4CwN9GF46wgAcjAZyEtZGJVGJY",
  authDomain: "whatsapp-web-clone-27ee7.firebaseapp.com",
  projectId: "whatsapp-web-clone-27ee7",
  storageBucket: "whatsapp-web-clone-27ee7.appspot.com",
  messagingSenderId: "241747433808",
  appId: "1:241747433808:web:3396ddcdd2955115303455",
  measurementId: "G-TBSEKQS307"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const createRoom = async(roomName) => {
  try {
    let collectionRef = collection(db, 'rooms');
    const documentRef = await addDoc(collectionRef, {
      name : roomName
    });
    return {id:documentRef.id, data: {name: roomName}};
  } catch(error) {
    console.log(error, "erron in creating room");
  }
}

export const createMessage = async (roomId, message, name) => {
  try{
    let collectionRef = collection(db, "rooms");
    let docRef = doc(collectionRef, roomId);
    let subCollectionRef = collection(docRef, "messages");

    let newMessage = {
      message,
      name,
      timeStamp:serverTimestamp()
    }

    let newDocRef = await addDoc(subCollectionRef, newMessage);
    return newDocRef;

  } catch (error) {
    console.log("Couldn't send message")
  }
}

export const signInithGooglePopup = async() => {
  try{
    let response = await signInWithPopup(auth, googleProvider);
    return response.user;
  } catch (error) {
    console.log(error, "error occured in singing with google");
  }
}

export const signOutAccount = async () => {
  try{
      await signOut(auth);
      console.log("signned out")
  } catch(error){
    console.log(error, "error occured during signout");
  }
}

export default db;