import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, NextOrObserver, User, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { QueryDocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type UserData = {
  createdAt: Date,
  email: string,
  displayName: string
};

export const createUserDocumentFromAuth = async ( 
    userAuth: User 
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
        email
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
  onAuthStateChanged(auth, callback);
