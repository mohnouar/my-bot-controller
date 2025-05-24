"use client";

import { resetSocket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [flaskServer, setFlaskServer] = useState("");
  const [cameraStream, setCameraStream] = useState("");

  useEffect(() => {
    const savedFlask = localStorage.getItem("flaskServer");
    const savedCamera = localStorage.getItem("cameraStream");
    if (savedFlask) setFlaskServer(savedFlask);
    if (savedCamera) setCameraStream(savedCamera);
  }, []);

  const handleSave = () => {
    localStorage.setItem("flaskServer", flaskServer);
    localStorage.setItem("cameraStream", cameraStream);

    // إعادة تهيئة الاتصال
    resetSocket();

    alert("تم حفظ الإعدادات بنجاح! يُفضل إعادة تحميل الصفحة لتطبيق الاتصال.");

  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-[#1A1C20] to-[#0F1014] border border-[#1F232A] rounded-2xl shadow-2xl ring-1 ring-[#2A2E38]">
        <h1 className="text-2xl font-bold mb-6 text-center">🔧 إعداد الاتصال بالسيرفر</h1>

        <label className="block mb-4">
          <span className="text-gray-300 text-sm">🧠 عنوان سيرفر Flask:</span>
          <input
            type="text"
            value={flaskServer}
            onChange={(e) => setFlaskServer(e.target.value)}
            placeholder="مثال: http://192.168.1.100:5000"
            className="w-full mt-1 px-4 py-2 bg-[#1A1C20] border border-[#2A2E38] rounded-lg outline-none text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-300 text-sm">📷 رابط بث الكاميرا:</span>
          <input
            type="text"
            value={cameraStream}
            onChange={(e) => setCameraStream(e.target.value)}
            placeholder="مثال: http://192.168.1.101:8080/video"
            className="w-full mt-1 px-4 py-2 bg-[#1A1C20] border border-[#2A2E38] rounded-lg outline-none text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-lg font-semibold text-sm shadow-md"
        >
          💾 حفظ الإعدادات
        </button>
      </div>
      <button className="button" onClick={()=> router.push('/control')}>Voice Control</button>
    </div>
  );
}
