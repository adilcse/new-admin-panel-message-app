import { useState, useEffect, useMemo, useCallback } from 'react';
import { collection, query, getDocs, orderBy, limit, startAfter, onSnapshot, where } from 'firebase/firestore';

const usePagination = (firestore, collectionPath, column, direction, pageSize = 10, filter = null, refresh = 1) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);

  const getNext = useCallback(() => {
    if (lastDoc) {
      setCurrentPage((page) => page + 1);
    }
  }, [lastDoc]);

  const getPrev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }, [currentPage]);

  const isStart = useMemo(() => currentPage === 1, [currentPage]);
  const isEnd = useMemo(() => !lastDoc, [lastDoc]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const queryList = [
        collection(firestore, collectionPath),
        orderBy(column, direction),
        limit(pageSize)
      ];

      if (!isStart) {
        queryList.push(startAfter(lastDoc));
      }

      if (filter) {
        queryList.push(where(filter[0], filter[1], filter[2]));
      }

      const q = query(...queryList);
      const snapshot = await getDocs(q);

      if (snapshot.docs.length > 0) {
        const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastDoc(newLastDoc);
      } else {
        setLastDoc(null);
      }

      const newItems = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }));
      setItems(newItems);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, pageSize, firestore, collectionPath, column, isStart, direction, filter]);

  useEffect(() => {
    const queryList = [
      collection(firestore, collectionPath),
      orderBy(column, direction),
      limit(pageSize)
    ];
  
    if (!isStart) {
      queryList.push(startAfter(lastDoc));
    }
  
    if (filter) {
      queryList.push(where(filter[0], filter[1], filter[2]));
    }
  
    const q = query(...queryList);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!fetchedData) {
        setFetchedData(true);
        return;
      }
  
      snapshot.docChanges().forEach((change) => {
        const changedData = { docId: change.doc.id, ...change.doc.data() };
        setItems((oldItems) => {
          let updatedItems = [...oldItems];
  
          if (change.type === 'added') {
            if (updatedItems.length > 0 && changedData?.createdAt?.toDate() > updatedItems[0]?.createdAt?.toDate()) {
              updatedItems.unshift(changedData);
            } else {
              updatedItems.push(changedData  )
            }
          } else if (change.type === 'modified') {
            updatedItems = updatedItems.map((item) => {
              if (item.docId === changedData.docId) {
                return changedData;
              }
              return item;
            });
          } else if (change.type === 'removed') {
            updatedItems = updatedItems.filter((item) => item?.docId !== changedData?.docId);
          }
  
          return updatedItems;
        });
      });
    });

    return () => unsubscribe();
  }, [firestore, collectionPath, column, direction, pageSize, isStart, lastDoc, filter, fetchedData]);

  return { getNext, getPrev, isStart, isEnd, isLoading, items };
};

export default usePagination;