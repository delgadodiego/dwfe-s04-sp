import { database } from "./firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "../context/ContextProvider";

export async function getData(aCollection) {
  try {
    const collectionRef = collection(database, aCollection);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((doc) => doc.data());

    return data;
  } catch (e) {
    console.error("Exception", e);
  }
}

export const useUpdate = () => {
  const { setTweets } = useContext(AppContext);
  const q = query(collection(database, "tweets"));
  const data = [];
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setTweets(data);
  });
};
