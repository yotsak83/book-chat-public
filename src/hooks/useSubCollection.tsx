import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  CollectionReference,
  Query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useAppSelector } from "../app/hooks";

interface Messages {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const bookId = useAppSelector((state) => state.book.bookId);

  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(bookId),
      subCollectionName
    );

    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "asc")
    );

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
    });
  }, [bookId]);

  return { subDocuments };
};

export default useSubCollection;
