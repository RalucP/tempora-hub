import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider, 
  NextOrObserver, 
  User, 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  QueryDocumentSnapshot, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  getFirestore, 
  query, 
  setDoc, 
  writeBatch 
} from "firebase/firestore";

import { Task } from "../store/tasks/task.types";

const firebaseConfig = {
  apiKey: "AIzaSyAl5Mwv-VSHKd0VFPrREX2-UaQzovoO6Q4",
  authDomain: "tempora-hub-db.firebaseapp.com",
  projectId: "tempora-hub-db",
  storageBucket: "tempora-hub-db.appspot.com",
  messagingSenderId: "623258163665",
  appId: "1:623258163665:web:6f360aef30b1ca7809a8f0",
  measurementId: "G-D2Q7MLN7Y2"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const db = getFirestore(firebaseApp);
export const auth = getAuth();

export const addTaskDocumentToUser = async (objectToAdd: Task) => {
  const batch = writeBatch(db);

  if(!auth.currentUser) return;

  const taskRef = doc(db, 'users', auth.currentUser.uid, 'tasks', objectToAdd.id);
  batch.set(taskRef, objectToAdd);

  await batch.commit();
}

export const getTaskCollectionFromUser = async () => {
  if(!auth.currentUser) return;

  const taskCollectionRef = collection(db, 'users', auth.currentUser.uid, 'tasks');

  const q = query(taskCollectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date,
  email: string,
  displayName: string
};

export const createUserDocumentFromAuth = async ( 
    userAuth: User,
    additionalInfo = {} as AdditionalInformation
  ) : Promise<void | QueryDocumentSnapshot<UserData>> => {
  if(!auth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        createdAt,
        displayName,
        email,
        ...additionalInfo,
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createUserAuthWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
  onAuthStateChanged(auth, callback);
