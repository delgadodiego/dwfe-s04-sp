import { database } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const subscribe = (col, callback) => {
  const onSubscribe = onSnapshot(collection(database, col), callback);
  return onSubscribe;
};
