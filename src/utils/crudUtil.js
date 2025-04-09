import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc, where } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readWorkers = async (setWorkers) => {
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

export const startShift = async (formdata/*, setState*/) => {
        const collectionRef = collection(db, "shifts")
        console.log(formdata);

        let arr = formdata.split(";")
        const newItem = { workerId:arr[0] ,name:arr[1], start: Timestamp.now() }
        await addDoc(collectionRef, newItem).then(docRef => {
                console.log("uj post azonositoja:" + docRef.id)
                //setState(docRef.id)
        })
}

export const endShift = async (shiftId) => {
        const docRef = doc(db, "shifts", shiftId)
        let endtime = Timestamp.now()

        console.log((await getDoc(docRef)).data());
        
        
        let duration = ( ((endtime.toMillis()) - ( (await getDoc(docRef)).data().start.toMillis())) )/3600000
        
        await updateDoc(docRef, {end: endtime, duration:duration})
}


/*
*       handles the shift's status automatically, end shift if there's one open, opens a new one if not
        
*/
export const checkShiftStatus = async (workerId) => {
        const collectionRef = collection(db, "shifts");
        let arr = workerId.split(";")
        const q = query(
          collectionRef,
          where("workerId", "==", arr[0]),
          
        );
        const docs = await getDocs(q)
      

      
        let hasUndendedShift = false
        let saidShiftId = null
        docs.forEach((shift) => {
          if (shift.data().end==null) { 
            hasUndendedShift = true;
            saidShiftId = shift.id
          }
        });
        console.log(hasUndendedShift, saidShiftId);

        const _12hpassed = await checkIf12hPassed(arr[0])
        const _workerIsActive = await checkWorkerStatus(arr[0])
        console.log(_workerIsActive);
        
        if(_12hpassed && _workerIsActive)
        {
                if(hasUndendedShift)
                {
                        endShift(saidShiftId)
                        return "Shift ended"
                }else
                {
                        startShift(workerId)
                        return "Shift started"
                }
        }else
        {
                return !_12hpassed ? "You should wait 12h before starting your next shift!" : "You are not an active worker."
        }

      };



export const readShifts = (setShifts) => 
{
        const collectionRef = collection(db, "shifts")
        const q = query(collectionRef, orderBy("workername", "asc"))
        const unsubscribe = onSnapshot(q, (snapshot) => { setShifts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) })
        return unsubscribe
}

export const checkIf12hPassed = async (workerId) => {
        try {
            const cRef = collection(db, "shifts");
            const q = query(cRef, where("workerId", "==", workerId), orderBy("end", "desc"));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                console.log("No shifts found for this worker");
                return true; 
            }
            
            
            const mostRecentShift = querySnapshot.docs[0].data();
            const shiftEndTime = new Date(mostRecentShift.end.seconds * 1000);
            const currentTime = new Date();

            
            const hoursPassed = (currentTime - shiftEndTime) / (1000 * 60 * 60);
            
            
            
            return hoursPassed >= 12;
        } catch (error) {
            console.error("Error checking shift time:", error);
            throw error;
        }
    }

// Return true if worker exists AND has status "active", false otherwise
export const checkWorkerStatus = async (workerId) => {
        console.log("Checking status for worker:", workerId);
        
        try {
            
            const docRef = doc(db, "workers", workerId);
            const docSnap = await getDoc(docRef);
    
            if (!docSnap.exists()) {
                console.log("Worker does not exist");
                return false;
            }
    
            const workerData = docSnap.data();
            const isActive = workerData.status === "active";
    
            if (!isActive) {
                console.log("Worker is not active");
            }
    
            return isActive;
        } catch (error) {
            console.error("Error checking worker status:", error);
            return false;
        }
    }   