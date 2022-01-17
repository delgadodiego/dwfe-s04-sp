import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { CONFIGS } from "../utils/configs";
import { auth, database } from "./firebase";
import { getDocByID } from "./operations";

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const credentials = await signInWithPopup(auth, provider);
    return credentials;
  } catch (e) {
    console.error("Exception at signIn", e.message);
  }
};

export const signOut = () => {
  try {
    _signOut(auth);
  } catch (e) {
    console.error("Exception at signOut", e);
  }
};

export const handleAuthChange = async (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

export const addUserToFirestore = async (user) => {
  const { uid, displayName, email, photoURL } = user;

  const userExists = await getDocByID(CONFIGS.collectionUsers, uid);
  try {
    if (!userExists) {
      await setDoc(doc(collection(database, CONFIGS.collectionUsers), uid), {
        name: displayName,
        email: email,
        likedTweets: "||",
        uid: uid,
        photoURL: photoURL,
        username: "",
        color: "",
      });
    }

    return userExists;
  } catch (e) {
    console.error("Exception at addUserToFirestore", e);
  }
};
