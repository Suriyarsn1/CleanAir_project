

export default function DateFilter({ filterDate, setFilterDate }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
      <label htmlFor="filterDate" className="text-sky-700 font-semibold">
        Filter Predictions by Date:
      </label>
      <input
        id="filterDate"
        type="date"
        className="border border-sky-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />
      <button
        type="button"
        onClick={() => setFilterDate("")}
        title="Clear filter"
        className="bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 rounded transition whitespace-nowrap"
      >
        Clear
      </button>
    </div>
  );
}
