"use client";

// import JoystickModes from "@/components/Joystick";
// import SpeedSlider from "@/components/Slider";

export default function Home() {
  if (!window) return;
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
        {/* <JoystickModes /> */}
        {/* <SpeedSlider /> */}
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="button">Vioce Control</button>
        <button className="button">Voice Control</button>
      </div>
    </main>
  );
}
