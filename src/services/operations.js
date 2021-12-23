import { database } from "./firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const subscribe = (col, callback) => {
  try {
    const onSubscribe = onSnapshot(collection(database, col), callback);
    return onSubscribe;
  } catch (e) {
    console.error("Exception at subscribe:", e);
  }
};

export const postData = (col, data) => {
  try {
    const docReference = addDoc((collection(database, col), data));
    console.info("docReference", docReference.user);
  } catch (e) {
    console.error("Exception at postData:", e);
  }
};
