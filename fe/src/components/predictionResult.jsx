import PredictionHistory from "../components/predictionHistory";

export default function PredictionResult({
  resultData,
  onRetest,
  onShowHistory,
  showHistory,
  history,
  interpretResult,
  probability, // receive the numeric probability prop
}) {
  // Format probability as percentage with 1 decimal place
  const formattedProbability =
    probability !== null && probability !== undefined
      ? `${(probability * 100).toFixed(1)}%`
      : "N/A";

  return (
    <div className="relative mt-12 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl shadow-2xl border border-sky-200 bg-white/70 transition-all duration-700 animate-fade-in max-w-xl mx-auto w-full">
      {/* Result Image */}
      {resultData.img && (
        <img
          src={resultData.img}
          alt="Result visual"
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-lg mb-4 animate-float"
        />
      )}

      {/* Status */}
      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-sky-700 drop-shadow text-center">
        {resultData.status}
      </h3>

      {/* Probability Display */}
      <p className="text-sm sm:text-base mb-4 font-medium text-center text-gray-600">
        Prediction Confidence: <span className="font-semibold">{formattedProbability}</span>
      </p>

      {/* Description */}
      <div className="text-gray-700 text-sm sm:text-base mb-3 text-center px-2">
        {resultData.desc}
      </div>

      {/* Advice */}
      <div className="text-md text-center px-2 mb-4 w-full max-w-lg">{resultData.advice}</div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs">
        <button
          onClick={onRetest}
          className="flex-grow py-2 text-white bg-sky-500 rounded-lg font-semibold hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-1"
          type="button"
        >
          Retest
        </button>

        <button
          onClick={onShowHistory}
          className="flex-grow py-2 bg-white text-sky-700 border border-sky-400 rounded-lg font-semibold hover:bg-sky-100 transition focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
          type="button"
          aria-expanded={showHistory}
          aria-controls="prediction-history-section"
        >
          {showHistory ? "Hide" : "Show"} History
        </button>
      </div>

      {/* Conditional History Section */}
      {showHistory && (
        <div id="prediction-history-section" className="w-full mt-8" aria-live="polite">
          <PredictionHistory history={history} interpretResult={interpretResult} />
        </div>
      )}
    </div>
  );
}
