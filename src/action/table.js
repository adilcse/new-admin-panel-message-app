import { collection, getDocs, getDoc, doc, query, orderBy, limit, startAfter, endBefore } from "firebase/firestore";
import {db} from '../firebase';
const COLLECTION_NAME = 'formData';
const TOTAL_COLLECTION_NAME = 'formDataCounter';
const TOTAL_DOC_NAME = 'counter';

export const getFormData = async (offset = null, l=10, next=true) => {
    console.log(offset, l, next)
    try{
        const data = [];
        const col = collection(db, COLLECTION_NAME);
        let q;    
        if(offset && !next) {
            q = query(col, orderBy('slNo'), startAfter(offset), limit(l));        
        } if(offset) {
            q = query(col,  orderBy('slNo'), endBefore(offset), limit(l));  
        } else {
            q = query(col,  limit(l));    
        }
        const querySnapshot = await getDocs(q);
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        // lastVisible = lastVisible && lastVisible.data() && lastVisible.data().id
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return {data, last: lastVisible};
    } catch (error) {
        console.error(error);
        return {data: [], last: null};
    }
}

export const getTotalData = async () => {
    try{
        const snapshot = await getDoc(doc(db, TOTAL_COLLECTION_NAME, TOTAL_DOC_NAME));
        if (snapshot.exists()) {
            return snapshot.data().dataCount || 0;
        }
        return 0;
    } catch(error) {
        console.log(error);
        return 0;
    }

}

