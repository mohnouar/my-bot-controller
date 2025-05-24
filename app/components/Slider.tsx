import React, { useState, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  initial: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, initial, onChange }) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  // Calculate the percentage for background gradient
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{min}</span>
          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{value}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{max}</span>
        </div>
        <div className="relative">
          <div 
            className="absolute h-1 top-1/2 left-0 -translate-y-1/2 rounded-full w-full bg-gray-800"
            style={{
              background: `linear-gradient(to right, rgb(55, 48, 163) ${percentage}%, rgb(31, 41, 55) ${percentage}%)`
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="relative w-full h-1 bg-transparent appearance-none cursor-pointer z-10
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-indigo-600
              [&::-webkit-slider-thumb]:ring-4
              [&::-webkit-slider-thumb]:ring-indigo-200
              [&::-webkit-slider-thumb]:dark:ring-indigo-900
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:bg-indigo-700
              [&::-webkit-slider-thumb]:hover:ring-indigo-300
              [&::-webkit-slider-thumb]:dark:hover:ring-indigo-800
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-indigo-600
              [&::-moz-range-thumb]:ring-4
              [&::-moz-range-thumb]:ring-indigo-200
              [&::-moz-range-thumb]:dark:ring-indigo-900
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:hover:bg-indigo-700
              [&::-moz-range-thumb]:hover:ring-indigo-300
              [&::-moz-range-thumb]:dark:hover:ring-indigo-800"
          />
        </div>
        <div className="relative mt-1 w-full h-6">
          {Array.from({ length: Math.floor((max - min) / step) + 1 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-0.5 h-1.5 bg-gray-400 transform -translate-x-1/2"
              style={{
                left: `${(index * step * 100) / (max - min)}%`,
                opacity: index % 2 === 0 ? 0.6 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider; 