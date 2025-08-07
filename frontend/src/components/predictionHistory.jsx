export default function PredictionHistory({ history, interpretResult }) {
  return (
    <div className="mt-5 w-full max-w-3xl max-h-[60vh] overflow-y-auto space-y-6 px-2 sm:px-4 md:px-8 mx-auto">
      <h4 className="text-sky-700 font-bold mb-4 text-xl xs:text-2xl sm:text-3xl text-center drop-shadow-sm">
        Prediction History
      </h4>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center text-sm md:text-base">No predictions yet.</p>
      ) : (
        history.map((item, idx) => {
         
          const predictionValue = Array.isArray(item.output)
            ? item.output[0]?.prediction ?? item.output[0]
            : item.output?.prediction ?? item.output;
          const probabilityValue = item.output?.probability ?? null;

          const interpreted = interpretResult(predictionValue);

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-6 rounded-2xl shadow-xl border border-sky-200 bg-white/90 transition-all duration-700 animate-fade-in w-full"
            >
              {interpreted.img && (
                <img
                  src={interpreted.img}
                  alt="Prediction result"
                  className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 object-cover rounded-full shadow-lg mb-4 animate-float"
                />
              )}
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-sky-700 drop-shadow text-center">
                {interpreted.status}
              </h3>
              <p className="text-gray-700 mb-1 text-center max-w-lg">{interpreted.desc}</p>
              {/* Show probability */}
              {probabilityValue !== null && probabilityValue !== undefined && (
                <p className="text-sm text-gray-600 mb-2 text-center max-w-lg">
                  Confidence: {(probabilityValue * 100).toFixed(1)}%
                </p>
              )}
              {interpreted.advice && (
                <div className="text-base sm:text-sm mb-2 text-center max-w-lg">{interpreted.advice}</div>
              )}
              <p className="text-xs text-gray-400 mt-1 text-center break-all">
                Predicted at: {item.at}
              </p>
              <details className="mt-3 text-gray-600 text-xs max-w-xs xs:max-w-md sm:max-w-xl cursor-pointer w-full mx-auto">
                <summary className="font-semibold underline">Input Features (raw data)</summary>
                <p className="mt-1 break-words">{`[${item.input.join(", ")}]`}</p>
              </details>
            </div>
          );
        })
      )}
    </div>
  );
}
