import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function initializeFirestore() {
  const timerDocRef = doc(db, "settings", "timer");

  try {
    await setDoc(timerDocRef, {
      timeLeft: 3600,
      message: "Default Timer Message",
    });
    console.log("Default documents created.");
  } catch (error) {
    console.error("Error initializing Firestore:", error);
  }
}

initializeFirestore();
