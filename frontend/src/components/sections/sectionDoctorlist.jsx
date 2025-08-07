export default function SectionDoctorList() {
  // Sample static data 
  const doctors = [
    { id: 1, name: "Dr. Arvind Kumar", hospital: "Medanta Hospital, Gurugram", url: "https://www.medanta.org/doctor/dr-arvind-kumar/" },
    { id: 2, name: "Dr. S.K. Chhabra", hospital: "BLK Hospital, New Delhi", url: "https://www.blkhospital.com/doctors/dr-s-k-chhabra/" }
  ];

  return (
    <section className="animate-fade-up px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-700 mb-6">
        Manage Doctor List
      </h2>
      <p className="text-sky-900 text-base sm:text-lg mb-8">
        Add, edit, or remove doctors.
      </p>

      <div className="overflow-x-auto rounded-lg border border-sky-200 shadow">
        <table className="min-w-full divide-y divide-sky-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Hospital</th>
              <th className="px-4 py-2 text-left text-sm sm:text-base font-semibold">Profile</th>
              <th className="px-4 py-2 text-center text-sm sm:text-base font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100 bg-white">
            {doctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-sky-50 cursor-pointer">
                <td className="px-4 py-3">{doc.name}</td>
                <td className="px-4 py-3">{doc.hospital}</td>
                <td className="px-4 py-3">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                    View Profile
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


