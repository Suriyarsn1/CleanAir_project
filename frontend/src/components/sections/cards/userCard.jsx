
import PredictionCard from "../cards/predictionCrad";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-sky-200 p-6 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-2 text-sky-700">{user.name}</h3>
      <p className="text-sm text-gray-500 mb-4 text-center sm:text-left">
        Email: {user.email} | Registered: {new Date(user.createdAt).toLocaleDateString()}
      </p>

      {user.predictions && user.predictions.length > 0 ? (
        <div className="space-y-6">
          {user.predictions.map((pred) => (
            <PredictionCard key={pred._id} prediction={pred} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No predictions yet.</p>
      )}
    </div>
  );
}
