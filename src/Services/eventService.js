import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Add a new event to firestore
export const addNewEventToFirestore = async (event) => {
  try {
    const collectionRef = collection(db, "events");
    const docRef = await addDoc(collectionRef, event);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
