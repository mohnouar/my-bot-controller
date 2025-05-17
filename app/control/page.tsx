"use client";

import JoystickModes from "@/components/Joystick";
import SpeedSlider from "@/components/Slider";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-2xl font-bold text-center mb-6">
        NippleJS Joystick Modes Demo
      </h1>
      <JoystickModes />
    </main>
  );
}
