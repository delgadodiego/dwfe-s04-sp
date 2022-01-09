import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
} from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import { auth, database } from "./firebase";
import { CONFIGS } from "../utils/configs";
import { getDocByID } from "./operations";

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const credentials = await signInWithPopup(auth, provider);
    await addUserToFirestore(credentials.user);
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

export const handleAuthChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

export const addUserToFirestore = async (user) => {
  // incluir en UserContext
  const { uid, displayName, email } = user;

  const userExists = await getDocByID(CONFIGS.collectionUsers, uid);

  if (!userExists) {
    await setDoc(doc(collection(database, CONFIGS.collectionUsers), uid), {
      name: displayName,
      email: email,
      likedTweets: "||",
    });
  }

  try {
  } catch (e) {
    console.error("Exception at addUserToFirestore", e);
  }
};
