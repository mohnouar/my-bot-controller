'use client'

import { useState } from 'react'
import { classNames } from '@/lib/utils' // أو ضع دالة classNames مباشرة هنا

export default function SpeedSlider() {
  const [value, setValue] = useState(100)

  const MIN = 10
  const MAX = 255
  const STEP = 49  // عدد الخطوات الظاهرة تقريبًا

  const steps = Array.from({ length: Math.floor((MAX - MIN) / STEP) + 1 }, (_, i) => MIN + i * STEP)

  return (
    <div className="max-w-md mx-auto bg-zinc-900 text-white p-6 rounded-xl shadow">
      <h2 className="text-sm mb-4">🔧 السرعة القصوى: <span className="font-bold">{value}</span></h2>

      <input
        type="range"
        min={MIN}
        max={MAX}
        value={value}
        step={1}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-green-500"
      />

      <div className="relative w-full h-6 mt-3">
        <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400">
          {steps.map((step) => (
            <span key={step} className="text-center" style={{ width: '1px' }}>
              |
              <div className="mt-1">{step}</div>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
