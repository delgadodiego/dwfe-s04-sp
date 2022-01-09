import { database } from "./firebase";
import {
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
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
    const docReference = await addDoc(collection(database, col), data);
    await setDoc(doc(collection(database, col), docReference.id), {
      ...data,
      id: docReference.id,
    });
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

export const getDocByID = async (col, id) => {
  const docRef = doc(database, col, id);
  const docByID = await getDoc(docRef);
  const data = docByID.data();
  return data;
};

export const updateTweet = async (col, user, tweet, like) => {
  const userRef = await getDocByID(col, user);

  await setDoc(doc(collection(database, col), user), {
    ...userRef,
    likedTweets: tweet,
  });

  console.info("USER", userRef);
};
