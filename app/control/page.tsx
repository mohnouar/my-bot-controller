"use client";

import dynamic from "next/dynamic";

const SemiJoystick = dynamic(() => import('@/components/Joystick'), {
  ssr: false,
});
const SpeedSlider = dynamic(() => import('@/components/Slider'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="p-5 flex flex-col gap-4 h-screen">
      <div className="w-full h-64">
        <img
          src="user-avatar.png"
          alt="Live Feed"
          className="rounded-xl border border-gray-700 shadow-lg w-full h-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <SemiJoystick />
        <SpeedSlider />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="button">Vioce Control</button>
        <button className="button">Voice Control</button>
      </div>
    </main>
  );
}
