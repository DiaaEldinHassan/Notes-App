import React, { useState } from 'react';

export default function GenderSelection({gender}) {
  const [selectedGender, setSelectedGender] = useState("");

  const handleChange = (e) => {
    setSelectedGender(e.target.value);
    gender(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <label className="text-sm font-semibold text-gray-700">Select Gender</label>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Male Option */}
        <label className={`
          relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
          ${selectedGender === "Male" ? "border-blue-500 bg-blue-50" : "border-gray-200"}
          ${selectedGender === "Female" ? "opacity-40 cursor-not-allowed grayscale" : "hover:border-blue-200"}
        `}>
          <input 
            type="radio" 
            name="gender" 
            value="Male"
            className="sr-only"
            disabled={selectedGender === "Female"}
            onChange={handleChange}
          />
          <span className={`text-sm font-bold ${selectedGender === "Male" ? "text-blue-700" : "text-gray-500"}`}>
            Male
          </span>
        </label>

        {/* Female Option */}
        <label className={`
          relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
          ${selectedGender === "Female" ? "border-pink-500 bg-pink-50" : "border-gray-200"}
          ${selectedGender === "Male" ? "opacity-40 cursor-not-allowed grayscale" : "hover:border-pink-200"}
        `}>
          <input 
            type="radio" 
            name="gender" 
            value="Female"
            className="sr-only" 
            disabled={selectedGender === "Male"}
            onChange={handleChange}
          />
          <span className={`text-sm font-bold ${selectedGender === "Female" ? "text-pink-700" : "text-gray-500"}`}>
            Female
          </span>
        </label>
      </div>

      {/* Reset Button (Optional) */}
      {selectedGender && (
        <button 
          onClick={() => setSelectedGender("")}
          className="text-xs text-gray-400 underline hover:text-gray-600 mt-2"
        >
          Reset Selection
        </button>
      )}
    </div>
  );
}