"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [timeLeft, setTimeLeft] = useState(3600); // Default time (1 hour)
  const [message, setMessage] = useState("Welcome to the Hackathon!");
  const [roundEndTime, setRoundEndTime] = useState("14:08");

  useEffect(() => {
    async function initializeFirestore() {
      try {
        const timerDocRef = doc(db, "settings", "timer");
        const docSnap = await getDoc(timerDocRef);

        if (!docSnap.exists()) {
          await setDoc(timerDocRef, {
            timeLeft: 3600,
            message: "Welcome to the Hackathon!",
            roundEndTime: "14:08"
          });
          console.log("Default Firestore document created.");
        } else {
          const data = docSnap.data();
          setTimeLeft(data.timeLeft || 3600);
          setMessage(data.message || "Welcome to the Hackathon!");
          setRoundEndTime(data.roundEndTime || "14:08");
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
        timeLeft, 
        message,
        roundEndTime 
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
        <label className="block text-sm font-medium mb-2">Set Time Left (in seconds):</label>
        <input
          type="number"
          value={timeLeft}
          onChange={(e) => setTimeLeft(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
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
        <label className="block text-sm font-medium mb-2">Round End Time:</label>
        <input
          type="text"
          value={roundEndTime}
          onChange={(e) => setRoundEndTime(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="14:08"
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
