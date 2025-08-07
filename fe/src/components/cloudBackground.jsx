
export default function CloudBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-10 left-4 w-60 h-28 bg-white bg-opacity-60 rounded-full blur-lg animate-cloud1" />
      <div className="absolute top-36 right-3 w-80 h-32 bg-white bg-opacity-40 rounded-full blur-2xl animate-cloud2" />
      <div className="absolute bottom-24 left-40 w-44 h-16 bg-white bg-opacity-50 rounded-full blur-lg animate-cloud3" />
      <div className="absolute bottom-10 right-1/3 w-72 h-24 bg-white bg-opacity-30 rounded-full blur-xl animate-cloud4" />
    </div>
  );
}
