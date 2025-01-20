"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Display() {
  const [timeLeft, setTimeLeft] = useState<number>(3600); // Default: 1 hour
  const [message, setMessage] = useState<string>("SIP CODE REPEAT");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeLeft);

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
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(hours).padStart(2, "0")}</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">:</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(minutes).padStart(2, "0")}</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">:</div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-white shadow-lg drop-shadow-2xl">{String(secs).padStart(2, "0")}</div>
            </div>
          </div>

          <div className="flex space-x-2 text-base sm:text-lg md:text-xl text-white z-10 mt-4">
            <div><span className="text-red-500">Round 1 ENDS</span> <span className="text-red-500">
              {String(Math.floor((timeLeft - 2700) / 60)).padStart(2, "0")}:{String((timeLeft - 2700) % 60).padStart(2, "0")}
            </span></div>
          </div>
          <div className="flex space-x-2 text-base sm:text-lg md:text-xl text-white z-10 mt-4">
            <div>DINNER FOR SLOT 1
              {String(Math.floor((timeLeft - 2700) / 60)).padStart(2, "0")}:{String((timeLeft - 2700) % 60).padStart(2, "0")}
           </div>
          </div>

          {/* Image with Text Overlay */}
          <div className="relative">
            <Image src={"/ann-final.png"} alt={"Announcement"} width={800} height={800} />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-font2 text-white font-bold bg-opacity-50 p-4 rounded mb-8">Dinner Ready Wanna get Cheesy UwU</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}