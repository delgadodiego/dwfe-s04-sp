import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { database } from "./firebase";

export const subscribe = (col, callback) => {
  try {
    const onSubscribe = onSnapshot(collection(database, col), callback);
    return onSubscribe;
  } catch (e) {
    console.error("Exception at subscribe:", e);
  }
};

export const postTweet = async (col, tweetToPost) => {
  try {
    const docReference = await addDoc(collection(database, col), tweetToPost);
    await setDoc(doc(collection(database, col), docReference.id), {
      ...tweetToPost,
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

export const updateUserLikedTweets = async (col, user, tweet, like) => {
  let newLikedTweets = undefined;
  if (like) {
    newLikedTweets = user.likedTweets + tweet.id + "||";
  } else {
    newLikedTweets = user.likedTweets.replace(tweet.id + "||", "");
  }

  await setDoc(doc(collection(database, col), user.uid), {
    ...user,
    likedTweets: newLikedTweets,
  });

  return await newLikedTweets;
};

export const updateTweetStats = async (col, tweet, like) => {
  let newLikes = undefined;
  if (like) {
    newLikes = tweet.likes + 1;
  } else {
    newLikes = tweet.likes - 1;
    if (newLikes < 0) {
      newLikes = 0;
    }
  }

  setDoc(doc(collection(database, col), tweet.id), {
    ...tweet,
    likes: newLikes,
  });
};

export const userSetup = async (col, user, username, selectedColor) => {
  await setDoc(doc(collection(database, col), user.uid), {
    ...user,
    username: username,
    color: selectedColor,
  });
};
