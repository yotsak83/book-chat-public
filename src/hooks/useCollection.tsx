import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { db } from "../Firebase";

interface Books {
  id: string;
  book: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Books[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const booksResult: Books[] = [];
      querySnapshot.docs.forEach((doc) => {
        booksResult.push({
          id: doc.id,
          book: doc.data(),
        });
      });
      setDocuments(booksResult);
    });
  }, []);

  return { documents };
};

export default useCollection;
