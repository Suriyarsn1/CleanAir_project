export default function DateFilter({ date, setDate }) {
  
  const today = new Date().toISOString().split("T")[0];

  const handleClear = () => {
    setDate("");
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="date"
        value={date || ""}
        max={today}          
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2 text-sky-800"
      />

      <button
        type="button"
        onClick={handleClear}
        className="bg-red-600 text-white rounded px-3 py-2 hover:bg-red-700 transition"
        aria-label="Clear date filter"
      >
        Clear
      </button>
    </div>
  );
}
