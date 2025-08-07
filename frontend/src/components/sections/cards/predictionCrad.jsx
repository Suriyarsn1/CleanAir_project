const interpretResult = (mlValue) => {
  if (mlValue === 0)
    return {
      status: "Lungs Healthy",
      desc: "Great! Your lungs appear healthy. Maintain this by regular exercise and a healthy lifestyle.",
      advice: "Keep up your healthy habits. Wish you continued good health! 🎉",
    };
  if (mlValue === 1)
    return {
      status: "Lung Cancer Detected",
      desc: "Warning: The results indicate a high likelihood of lung cancer.",
      advice: "Please consult a pulmonologist or oncologist immediately.",
    };
  return { status: "Unknown Result", desc: "Couldn't interpret the prediction.", advice: null };
};

export default function PredictionCard({ prediction }) {
 
  const output = prediction?.output || prediction;

  const predValue = Array.isArray(output) ? output[0]?.prediction ?? output[0] : output.prediction ?? output;
  const probValue = output.probability ?? null;

  const { status, desc, advice } = interpretResult(predValue);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-2">{status}</h3>
      <p className="mb-1">{desc}</p>
      {advice && <p className="italic mb-2">{advice}</p>}
      {probValue !== null && (
        <p className="text-sm text-gray-600">
          Prediction confidence: {(probValue * 100).toFixed(1)}%
        </p>
      )}
      {prediction.date || prediction.at ? (
        <p className="text-xs text-gray-400 mt-2">
          Predicted at: {new Date(prediction.date || prediction.at).toLocaleString()}
        </p>
      ) : null}
      {/* display raw inputs */}
      {prediction.input && (
        <details className="mt-3 text-xs text-gray-600">
          <summary className="cursor-pointer underline">Input data</summary>
          <p>{`[${prediction.input.join(", ")}]`}</p>
        </details>
      )}
    </div>
  );
}
