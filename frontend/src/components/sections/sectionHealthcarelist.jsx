export default function SectionHealthCareList() {
  // Example static data
  const healthcareCenters = [
    {
      id: 1,
      name: "Talwalkars Gym",
      url: "https://www.talwalkars.net/",
      location: "Bandra West, Mumbai, Maharashtra",
    },
    {
      id: 2,
      name: "Cult.Fit",
      url: "https://www.cult.fit/",
      location: "Koramangala, Bengaluru, Karnataka",
    },
  ];

  return (
    <section className="animate-fade-up px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-700 mb-6">
        Manage Health Care List
      </h2>
      <p className="text-sky-900 text-base sm:text-lg mb-8">
        Manage health care centers and locations.
      </p>

      <div className="overflow-x-auto rounded-lg border border-sky-200 shadow">
        <table className="min-w-full divide-y divide-sky-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Location</th>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Website</th>
              <th className="px-4 py-2 text-center text-sm sm:text-base font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100 bg-white">
            {healthcareCenters.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No health care centers found.
                </td>
              </tr>
            ) : (
              healthcareCenters.map((center) => (
                <tr key={center.id} className="hover:bg-sky-50 cursor-pointer">
                  <td className="px-4 py-3">{center.name}</td>
                  <td className="px-4 py-3">{center.location}</td>
                  <td className="px-4 py-3">
                    <a
                      href={center.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Visit Website
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded text-sm sm:text-base transition">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm sm:text-base transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
