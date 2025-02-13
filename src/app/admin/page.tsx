"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [message, setMessage] = useState("Welcome to the Hackathon!");
  const [roundText, setRoundText] = useState("Round 1 ENDS");
  const [announcement, setAnnouncement] = useState("Dinner Ready Wanna get Cheesy UwU");

  useEffect(() => {
    async function initializeFirestore() {
      try {
        const timerDocRef = doc(db, "settings", "timer");
        const docSnap = await getDoc(timerDocRef);

        if (!docSnap.exists()) {
          await setDoc(timerDocRef, {
            message: "Welcome to the Hackathon!",
            roundText: "Round 1 ENDS",
            announcement: "Dinner Ready Wanna get Cheesy UwU"
          });
          console.log("Default Firestore document created.");
        } else {
          const data = docSnap.data();
          setMessage(data.message || "Welcome to the Hackathon!");
          setRoundText(data.roundText || "Round 1 ENDS");
          setAnnouncement(data.announcement || "Dinner Ready Wanna get Cheesy UwU");
          console.log("Firestore document loaded.");
        }
      } catch (error) {
        console.error("Error initializing Firestore:", error);
      }
    }

    initializeFirestore();
  }, []);

  const updateTimer = async () => {
    try {
      const timerDocRef = doc(db, "settings", "timer");
      await setDoc(timerDocRef, { 
        message,
        roundText,
        announcement
      });
      console.log("Timer updated successfully.");
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Set Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Round Text:</label>
        <input
          type="text"
          value={roundText}
          onChange={(e) => setRoundText(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Round 1 ENDS"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Announcement Text:</label>
        <input
          type="text"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter announcement text"
        />
      </div>
      <button
        onClick={updateTimer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Timer
      </button>
    </div>
  );
}
