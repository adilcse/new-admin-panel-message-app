import { useState, useEffect, useMemo } from 'react';
import { collection, query, getDocs, orderBy, limit, startAfter, onSnapshot } from 'firebase/firestore';

const usePagination = (firestore, collectionPath, column, direction, pageSize = 10) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false)

  const getNext = () => {
    if (lastDoc) {
      setCurrentPage((page) => page + 1);
    }
  };

  const getPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const isStart = useMemo(() =>currentPage === 1, [currentPage]);
  const isEnd =  useMemo(() =>!lastDoc, [lastDoc]); ;


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const queryList = [collection(firestore, collectionPath), orderBy(column, direction), limit(pageSize)]
      if (!isStart) {
        queryList.push(startAfter(lastDoc));
      }
      const q = query(...queryList);
      const snapshot = await getDocs(q);

      if (snapshot.docs.length > 0) {
        const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastDoc(newLastDoc);
      } else {
        setLastDoc(null);
      }

      const newItems = snapshot.docs.map((doc) => ({docId: doc.id, ...doc.data()}));
      setItems(newItems);
      setIsLoading(false);
    };
    fetchData();
    console.log('data fetched')
  }, [currentPage, pageSize, firestore, collectionPath, column, isStart, direction]);

  useEffect(()=> {
    const queryList = [collection(firestore, collectionPath), orderBy(column, direction), limit(pageSize)]
      if (!isStart) {
        queryList.push(startAfter(lastDoc));
      }
      const q = query(...queryList);
    return onSnapshot(q, (snapshot) => {
      if(!fetchedData) {
        setFetchedData(true);
        return;
      }
    snapshot.docChanges().forEach((change) => {   
        const changedData = {docId: change.doc.id, ...change.doc.data()} 
      let oldData = [...items]
      if (change.type === "added") {
          oldData.unshift(changedData);
      }
      if (change.type === "modified") {
        oldData = oldData.map(d=> {
          if(d.docId === changedData.docId) {
            return changedData
          } else {
            return d;
          }
        })
      }
      if (change.type === "removed") {
        oldData = oldData.filter(d=> d.docId !== changedData.docId);
      }
      setItems(oldData);
    });
  })
  },[]);

  return { getNext, getPrev, isStart, isEnd, isLoading, items };
};

export default usePagination;
