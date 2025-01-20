"use client";

import { useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FirestoreTest() {
  async function testFirestore() {
    try {
      // Test Write
      const docRef = await addDoc(collection(db, "testCollection"), {
        testField: "Hello, Firestore!",
      });
      console.log("Document written with ID:", docRef.id);

      // Test Read
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (error) {
      console.error("Error connecting to Firestore:", error);
    }
  }

  useEffect(() => {
    testFirestore();
  }, []);

  return <div>Check your console for Firestore logs.</div>;
}
