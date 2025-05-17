"use client";

import { useEffect, useRef, useState } from "react";
import nipplejs, { JoystickManager, JoystickOutputData } from "nipplejs";
import { io, Socket } from "socket.io-client";

export default function SemiJoystick() {
  const joystickRef = useRef<JoystickManager | null>(null);
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const [debug, setDebug] = useState<any>({});
  const socketRef = useRef<Socket | null>(null); // WebSocket reference
  const lastSentRef = useRef<number>(0);

  useEffect(() => {
    // Connect to Flask WebSocket server
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log("Connected to Flask WebSocket server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!zoneRef.current) return;

    joystickRef.current = nipplejs.create({
      zone: zoneRef.current,
      mode: "semi",
      catchDistance: 150,
      color: "white",
      size: 150
    });

    joystickRef.current
      .on("start", (evt, data) => updateDebug(data))
      .on("end", () => {
        updateDebug({});
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit("joystick", { stop: true });
        }
      })
      .on("move", (evt, data) => {
        updateDebug(data);
        sendJoystickDataToServer(data); // Send sin/cos over WebSocket
      })
      .on("pressure", (evt, data) => updateDebug({ pressure: data }));

    return () => {
      joystickRef.current?.destroy();
    };
  }, []);

  const updateDebug = (data: any) => {
    setDebug((prev: any) => ({ ...prev, ...data }));
  };

  const sendJoystickDataToServer = (data: JoystickOutputData) => {
    if (!data.angle || data.angle.degree === undefined || !data.force) return;

    const now = Date.now();
    if (now - lastSentRef.current < 50) {
      return;
    }
    lastSentRef.current = now;

    const radian = (data.angle.degree * Math.PI) / 180;
    const payload = {
      sin: Math.sin(radian),
      cos: Math.cos(radian),
      force: data.force,
    };

    // Emit 'joystick' event to the Flask server
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joystick", payload);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Semi Joystick Demo</h2>
      <div ref={zoneRef} className="relative h-64 border rounded bg-gray-800">
      </div>
    </div>
  );
}
