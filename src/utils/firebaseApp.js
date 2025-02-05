import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

//referenciak:
export const db = getFirestore(app)
export const auth = getAuth(app)

export async function getCategories() {
    return (await getDocs(collection(db, "categories"))).docs
}