import { database } from "./firebase";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

export const subscribe = (col, callback) => {
  try {
    const onSubscribe = onSnapshot(collection(database, col), callback);
    return onSubscribe;
  } catch (e) {
    console.error("Exception at subscribe:", e);
  }
};

export const postTweet = async (col, data) => {
  try {
    await addDoc(collection(database, col), data);
  } catch (e) {
    console.error("Exception at postTweet:", e);
  }
};

export const deleteTweet = async (col, data) => {
  try {
    await deleteDoc(doc(database, col, data));
  } catch (e) {
    console.error("Exception at deleteTweet", e);
  }
};

export const getTweets = async (col, user) => {
  try {
    const collectionRef = collection(database, "tweets");
    const q = query(collectionRef, where("user", "==", "User 1"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.info("Doc", doc.data());
    });
  } catch (e) {
    console.error("Exception at getTweets", e);
  }
};

//export const getDataByID
