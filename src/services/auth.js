import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { auth } from "./firebase";

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

export const handleAuthChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

export const addUserToFirestore = async (user) => {
  // incluir en UserContext

  const { id, displayName, avatar, email } = user;
  /* const userExists = await getDataByID("usersCollection", id);
  if (!userExists) {
    await setDocument("usersCollection", id, {
      name: displayName,
      email: email,
      avatar: avatar,
    });
  } */
  try {
  } catch (e) {
    console.error("Exception at addUserToFirestore", e);
  }
};
