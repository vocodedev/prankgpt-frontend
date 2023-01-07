import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // TODO: Add your Firebase configuration here
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getMessages = (
  chatId: string,
  callback: (messages: any) => void
) => {
  return onSnapshot(
    query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
};

export const getChatMetadata = (
  chatId: string,
  callback: (chat: any) => void
) => {
  const chatDocRef = doc(db, "chats", chatId);
  return onSnapshot(chatDocRef, (doc) => {
    callback({ ...doc.data(), id: doc.id });
  });
};
