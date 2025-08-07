import React from "react";

export default function PredictionForm({ fields, input, setInput, loading, onSubmit }) {
  // Update an input value by index
  const handleChange = (idx, val) => {
    const newInput = [...input];
    newInput[idx] = val;
    setInput(newInput);
  };

  // On form submit map inputs to numeric values and call onSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Map inputs to numeric values for backend
    const vals = input.map((v, i) => {
      const field = fields[i];
      if (field.name.toUpperCase() === "GENDER") {
        if (v === "M") return 1;
        if (v === "F") return 0;
        return 0; // default fallback for empty or unknown
      }
      if (field.type === "yesno") {
        return v === "yes" ? 1 : 0;
      }
      return Number(v);
    });

    onSubmit(vals);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleFormSubmit}>
      {fields.map((field, i) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label htmlFor={`input-${i}`} className="text-sky-700 font-semibold">
            {field.name}
          </label>

          {field.name.toUpperCase() === "GENDER" ? (
            <select
              id={`input-${i}`}
              required
              value={input[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="border border-sky-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/70"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          ) : field.type === "number" ? (
            <input
              id={`input-${i}`}
              type="number"
              min="0"
              required
              value={input[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`Enter ${field.name}`}
              className="border border-sky-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/70"
            />
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleChange(i, "yes")}
                className={`px-6 py-1 rounded border border-sky-400 font-bold ${
                  input[i] === "yes" ? "bg-sky-400 text-white drop-shadow" : "bg-white"
                } hover:bg-sky-300 hover:text-white transition duration-200`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleChange(i, "no")}
                className={`px-6 py-1 rounded border border-sky-200 font-bold ${
                  input[i] === "no" ? "bg-sky-400 text-white drop-shadow" : "bg-white"
                } hover:bg-sky-200 hover:text-white transition duration-200`}
              >
                No
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 mt-5 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ${
          loading ? "opacity-80 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <span className="animate-bounce">Predicting...</span> : "Predict"}
      </button>
    </form>
  );
}
