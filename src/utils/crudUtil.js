import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readWorkers = async ( setWorkers ) =>
{
        /*const querySnapshot = await getDocs(collection(db, "workers"))
        let workers = []
        querySnapshot.forEach((doc)=>  { workers.push({...doc.data(), id:doc.id}) })
        return workers*/
        
        const collectionRef = collection(db, "workers")
        const q = query(collectionRef, orderBy("name", "asc"))
        const unsubscribe = onSnapshot(q , (snapshot) => { setWorkers(snapshot.docs.map( (doc) => ({...doc.data(),id:doc.id}) )) } )
       return unsubscribe
}

export const addWorker = async ( formdata ) =>
{
    const collectionRef = collection(db, "workers")
    console.log(formdata);
    
    const newItem = { ...formdata }
    await addDoc(collectionRef, newItem)
}

export const startShift = async (formdata) =>
{
        const collectionRef = collection(db, "shifts")
        console.log(formdata);
        
        const newItem = { ...formdata, start: serverTimestamp() }
        await addDoc(collectionRef, newItem).then(docRef => console.log("uj post azonositoja:"+docRef.id)
        )
}

export const endShift = async (shiftId) =>
{
        const docRef = doc(db, "shifts", shiftId)
        await updateDoc(docRef, {end: serverTimestamp()})
}

export const checkShiftStatus = () =>
{
        
}

export const readShifts = ( setShifts ) =>
{
        const collectionRef = collection(db, "shifts")
        const q = query(collectionRef, orderBy("workername", "asc"))
        const unsubscribe = onSnapshot(q , (snapshot) => { setShifts(snapshot.docs.map( (doc) => ({...doc.data(),id:doc.id}) )) } )
        return unsubscribe
}