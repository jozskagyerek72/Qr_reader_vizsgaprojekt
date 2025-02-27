import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc, where } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readWorkers = async (setWorkers) => {
        /*const querySnapshot = await getDocs(collection(db, "workers"))
        let workers = []
        querySnapshot.forEach((doc)=>  { workers.push({...doc.data(), id:doc.id}) })
        return workers*/

        const collectionRef = collection(db, "workers")
        const q = query(collectionRef, orderBy("name", "asc"))
        const unsubscribe = onSnapshot(q, (snapshot) => { setWorkers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) })
        return unsubscribe
}

export const addWorker = async (formdata) => {
        const collectionRef = collection(db, "workers")
        console.log(formdata);

        const newItem = { ...formdata }
        await addDoc(collectionRef, newItem)
}

export const startShift = async (formdata, setState) => {
        const collectionRef = collection(db, "shifts")
        console.log(formdata);

        const newItem = { ...formdata, start: Timestamp.now() }
        await addDoc(collectionRef, newItem).then(docRef => {
                console.log("uj post azonositoja:" + docRef.id)
                setState(docRef.id)
        })
}

export const endShift = async (shiftId) => {
        const docRef = doc(db, "shifts", shiftId)
        let endtime = Timestamp.now()

        console.log((await getDoc(docRef)).data());
        
        
        let duration = ( ((endtime.toMillis()) - ( (await getDoc(docRef)).data().start.toMillis())) )/3600000
        // mostmar mukodik, szep munka en👍
        await updateDoc(docRef, {end: endtime, duration:duration})
}

/*export const checkShiftStatus = async (workerId) =>
{
        const collectionRef = collection(db, "shifts")
        const q = query(collectionRef, orderBy("start", "desc"), where("name","==",workerId))
        const docs = await getDocs(q)

        let hasUnendedShift = false
        docs.forEach(shift => {
                //if (shift.data().end)
                console.log(shift.data())
                
        })

        let duration = Timestamp.fromMillis(endtime.toMillis() - docRef.start.toMillis())
        //ez igy nem mukodik meg mivel datumot returnol
        await updateDoc(docRef, { end: endtime, duration: duration })
}
*/
//stefan verzioja

export const checkShiftStatus = async (workerId) => {
        const collectionRef = collection(db, "shifts");
        const q = query(
          collectionRef,
          where("name", "==", workerId),
          //where("end", "==", null) 
        );
        const docs = await getDocs(q)
      
        /*
        let hasUndendedShift = false
        docs.forEach((shift) => { // -> vegig iteral a dokumentumokon, de nem hasznalja oket
          if (docs.empty) { // -> igazabol nem mukodik mert azt nezi meg hogy a dokumentum letezik e, nem az ertekeit vizsgalja
            hasUndendedShift = false;
          }
          else {
            hasUndendedShift = true;
          }
        });
        console.log(hasUndendedShift);*/

        //fixed
        let hasUndendedShift = false
        let saidShiftId = null
        docs.forEach((shift) => {
                console.log(shift.data().end);
                
          if (shift.data().end==null) { 
            hasUndendedShift = true;
            saidShiftId = shift.id
          }
         
        });
        console.log(hasUndendedShift, saidShiftId);

      };



export const readShifts = (setShifts) => {
        const collectionRef = collection(db, "shifts")
        const q = query(collectionRef, orderBy("workername", "asc"))
        const unsubscribe = onSnapshot(q, (snapshot) => { setShifts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) })
        return unsubscribe
}