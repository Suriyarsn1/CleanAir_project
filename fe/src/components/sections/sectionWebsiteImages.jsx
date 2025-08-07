

export default function SectionWebsiteImages() {
  // Example placeholder data; replace with your real fetched data when ready
  const exampleImages = [
    { id: 1, title: "Homepage Banner", url: "https://source.unsplash.com/featured/?nature", alt: "Nature banner" },
    { id: 2, title: "Doctor Team", url: "https://source.unsplash.com/featured/?doctor", alt: "Doctor team" },
    { id: 3, title: "Clinic Lobby", url: "https://source.unsplash.com/featured/?clinic", alt: "Clinic lobby" },
  ];

  return (
    <section className="animate-fade-up px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-700 mb-6">
        Manage Website Images
      </h2>
      <p className="text-sky-900 text-base sm:text-lg mb-8">
        Add, edit, or delete website images here.
      </p>

      {/* Image grid placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {exampleImages.map(({ id, title, url, alt }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md border border-sky-200 overflow-hidden flex flex-col"
          >
            <img
              src={url}
              alt={alt}
              className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-sky-700 mb-2">{title}</h3>
              {/* Placeholder for buttons or actions */}
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded py-2 transition">
                  Edit
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Add form/modal to upload new images */}

    </section>
  );
}

