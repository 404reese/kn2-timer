"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Display() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [message, setMessage] = useState<string>("SIP CODE REPEAT");
  const [announcement, setAnnouncement] = useState<string>("Dinner Ready Wanna get Cheesy UwU");
  const [roundText, setRoundText] = useState<string>("Round 1 ENDS");

  const calculateTimeRemaining = () => {
    const targetDate = new Date('2025-01-24T14:00:00+05:30');
    const now = new Date();
    const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
    return Math.max(0, diffInSeconds);
  };

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeRemaining());

    // Subscribe to Firebase for announcement updates
    const unsubscribe = onSnapshot(doc(db, "settings", "timer"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMessage(data.message || "SIP CODE REPEAT");
        setAnnouncement(data.announcement || "Dinner Ready Wanna get Cheesy UwU");
        setRoundText(data.roundText || "Round 1 ENDS");
      }
    });

    // Local timer interval
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeLeft(remaining);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []); // No dependencies needed

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, secs };
  };

  const { days, hours, minutes, secs } = formatTime(timeLeft);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center">
        
        {/* Adjusted margin for the KN logo */}
        <Image src="/kn-logo-n.png" alt="KN Logo" className="w-1/3 mb-8 mt-28" width={400} height={400} />

        {/* Countdown Section */}
        <div className="relative flex flex-col items-center p-8">
          {/* Black container behind the timer */}
          <div className="bg-gray-800/80 border border-gray-400 p-8 rounded-lg shadow-lg z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white z-10 mb-4 drop-shadow-lg">Hackathon Countdown</h1>
            <div className="flex space-x-4 items-center justify-center">
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(days).padStart(2, "0")}</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">:</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(hours).padStart(2, "0")}</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">:</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(minutes).padStart(2, "0")}</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">:</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(secs).padStart(2, "0")}</div>
            </div>
            <div className="flex space-x-4 items-center justify-center mt-2">
              <div className="text-sm text-white">Days</div>
              <div className="w-8"></div>
              <div className="text-sm text-white">Hours</div>
              <div className="w-8"></div>
              <div className="text-sm text-white">Min</div>
              <div className="w-8"></div>
              <div className="text-sm text-white">Sec</div>
            </div>
          </div>

          <div className="flex space-x-2 text-base sm:text-lg md:text-xl text-white z-10 mt-4">
            <div><span className="text-red-500">{roundText}</span> 
            {/* <span className="text-red-500">
              {String(Math.floor((timeLeft - 2700) / 60)).padStart(2, "0")}:{String((timeLeft - 2700) % 60).padStart(2, "0")}
            </span>  */}
            </div>
          </div>
          {/* <div className="flex space-x-2 text-base sm:text-lg md:text-xl text-white z-10 mt-4">
            <div>{message}
              {String(Math.floor((timeLeft - 2700) / 60)).padStart(2, "0")}:{String((timeLeft - 2700) % 60).padStart(2, "0")}
           </div>
          </div> */}

          {/* Image with Text Overlay */}
          <div className="relative">
            <Image src={"/ann-final.png"} alt={"Announcement"} width={800} height={800} />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-font2 text-white font-bold bg-opacity-50 p-4 rounded mb-8">{announcement}</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}