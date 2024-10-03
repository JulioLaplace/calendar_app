import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Add a new event to firestore
export const addNewEventToFirestore = async (event) => {
  try {
    const collectionRef = collection(db, "events");

    // Create a new document in the collection with a random id
    const docRef = doc(collectionRef);

    // Get the generated id of the document before adding the event
    const generatedId = docRef.id;

    event.id = generatedId;
    // Add the event to the database
    await setDoc(docRef, event);
    // const docRef = await addDoc(collectionRef, event);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Edit an existing event in firestore
export const editEventInFirestore = async (event) => {
  try {
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, event);
    console.log("Document updated with ID: ", event.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete an event from firestore
export const deleteEventFromFirestore = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    console.log("Document deleted with ID: ", eventId);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// Get all events from firestore
export const getAllEventsFromFirestore = async () => {
  const events = [];
  try {
    const collectionRef = collection(db, "events");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc => {
      events.push(doc.data())
    }))
    return events;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
