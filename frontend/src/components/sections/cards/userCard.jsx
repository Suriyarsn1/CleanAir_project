import PredictionCard from "../cards/predictionCrad";
import { useState } from "react";
export default function UserCard({ user }) {
  const [showPredictions, setShowPredictions] = useState(false);

  return (
    <div className="user-card p-4 border rounded shadow mb-4">
      <h2 className="font-semibold text-lg mb-1">Email: {user.email || user.username}</h2>
      <p className="text-xs text-gray-500 mb-2">
        Registered: {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => setShowPredictions(!showPredictions)}
        className="mb-3 px-3 py-1 rounded bg-sky-600 text-white hover:bg-sky-700 transition"
        aria-expanded={showPredictions}
        aria-controls={`predictions-list-${user._id}`}
      >
        {showPredictions ? "Hide Predictions" : `Show Predictions (${user.predictions?.length || 0})`}
      </button>

      {showPredictions && (
        <div id={`predictions-list-${user._id}`} className="space-y-3 max-h-96 overflow-y-auto">
          {user.predictions && user.predictions.length > 0 ? (
            user.predictions.map((prediction) => (
              <PredictionCard key={prediction._id} prediction={prediction} />
            ))
          ) : (
            <p>No predictions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
