// components/FadeInImageText.jsx


export default function FadeInImageText({ imgSrc, imgAlt, title, children }) {
  return (
    <div className="p-8 bg-sky-100 rounded-lg shadow-lg mx-auto mt-8 flex flex-col md:flex-row items-center gap-8 fade-in max-w-7xl">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full md:w-1/3 rounded-lg shadow-md object-cover fade-in"
      />
      <div className="md:w-2/3 fade-in">
        <h2 className="text-4xl font-extrabold text-sky-700 mb-4">{title}</h2>
        <div className="text-lg text-sky-800">{children}</div>
      </div>
    </div>
  );
}
