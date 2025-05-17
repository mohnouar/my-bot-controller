'use client'
// pages/camera.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function CameraStream() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000'); // غيّر IP إذا كنت على جهاز آخر

    socket.on('connect', () => {
      console.log('✅ متصل بـ Flask');
    });

    socket.on('video_frame', (data) => {
      setImage(`data:image/jpeg;base64,${data.image}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {image ? (
        <img src={image} alt="Live Feed" className="w-full max-w-3xl rounded-xl shadow-lg" />
      ) : (
        <p className="text-white">📡 في انتظار الفيديو...</p>
      )}
    </div>
  );
}
