import { initializeApp } from "firebase/app";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

// Auth state persistence is handled in the useAuth hook

export const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "news-a923d.firebaseapp.com",
  projectId: "news-a923d",
  storageBucket: "news-a923d.appspot.com",
  messagingSenderId: "456930470226",
  // appId: "1:456930470226:web:1234567890123456789012",
  measurementId: "G-491162714",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signup = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    const token = await userCredential.user.getIdToken();
    await signOut(auth);
    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
