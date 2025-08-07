

const interpretResult = (mlValue) => {
  if (mlValue === 2)
    return {
      status: "Lungs Healthy",
      desc: "Great! Your lungs appear healthy. Maintain this by regular exercise and a healthy lifestyle.",
      advice: "Keep up your healthy habits. Wish you continued good health! 🎉",
    };
  if (mlValue === 3 || mlValue === 0)
    return {
      status: "Moderate Risk",
      desc: "There may be moderate signs of risk. It's recommended to manage your health proactively.",
      advice: "Consider joining a gym or fitness group to improve lung strength.",
    };
  if (mlValue === 1)
    return {
      status: "Lung Cancer Detected",
      desc: "Warning: The results indicate a high likelihood of lung cancer.",
      advice: "Please consult a pulmonologist or oncologist immediately.",
    };
  return {
    status: "Unknown Result",
    desc: "Couldn't interpret the prediction.",
    advice: null,
  };
};

export default function PredictionCard({ prediction }) {
  const output = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
  const { status, desc, advice } = interpretResult(output);

  return (
    <div className="p-4 rounded-xl shadow-lg border border-sky-200 bg-white/90 flex flex-col items-center max-w-xl w-full mx-auto">
      <h4 className="text-lg font-semibold text-sky-700 mb-1 text-center">{status}</h4>
      <p className="text-gray-700 mb-2 text-center">{desc}</p>
      {advice && <div className="text-sm mb-2 text-center">{advice}</div>}
      <p className="text-xs text-gray-400 mt-1 text-center">
        Predicted at: {new Date(prediction.date || prediction.at).toLocaleString()}
      </p>
      <details className="mt-2 w-full max-w-xl text-xs text-gray-600 cursor-pointer">
        <summary className="underline font-semibold">Input Features (raw data)</summary>
        <p className="break-words mt-1">[{(prediction.input || []).join(", ")}]</p>
      </details>
    </div>
  );
}
