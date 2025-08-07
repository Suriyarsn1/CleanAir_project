import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";
import CloudBackground from "./components/cloudBackground";
import PredictionForm from "../components/predictionForm";
import PredictionResult from "../components/predictionResult";
import PredictionHistory from "../components/predictionHistory";
import { fields, images, healthcareCenters, lungSpecialists } from "../utils/config";
import axios from "axios";

export default function LungCancerPredictPage() {
  // State
  const [input, setInput] = useState(Array(fields.length).fill(""));
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  // Interpret model predicted value to UI display info
  const interpretResult = (mlValue) => {
    if (mlValue === 2) {
      return {
        status: "Lungs Healthy",
        desc: "Great! Your lungs appear healthy. Maintain this by regular exercise and a healthy lifestyle.",
        img: images.healthy,
        advice: (
          <ul className="list-disc ml-5 mt-2 text-green-700">
            <li>
              Try these breathing exercises:{" "}
              <a
                href="https://www.healthline.com/health/breathing-exercises-for-copd"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Healthline Guide
              </a>
            </li>
            <li>Keep up your healthy habits. Wish you continued good health! 🎉</li>
          </ul>
        ),
      };
    }
    if (mlValue === 3 || mlValue === 0) {
      return {
        status: "Moderate Risk",
        desc: "There may be moderate signs of risk. It's recommended to manage your health proactively.",
        img: images.moderate,
        advice: (
          <div className="mt-2 text-blue-600">
            <p>Consider joining a gym or fitness group to improve lung strength.</p>
            <p className="mt-2 font-semibold">Sample fitness centers:</p>
            <ul className="list-disc ml-5">
              {healthcareCenters.map((c) => (
                <li key={c.name}>
                  <a href={c.url} className="underline" target="_blank" rel="noopener noreferrer">
                    {c.name}
                  </a>
                  , {c.location}
                </li>
              ))}
            </ul>
          </div>
        ),
      };
    }
    if (mlValue === 1) {
      return {
        status: "Lung Cancer Detected",
        desc: "Warning: The results indicate a high likelihood of lung cancer.",
        img: images.cancer,
        advice: (
          <div>
            <p className="text-red-700 font-bold mt-2">
              Please consult a pulmonologist or oncologist immediately.
            </p>
            <p className="mt-2">Example specialist centers:</p>
            <ul className="list-disc ml-5 mt-2">
              {lungSpecialists.map((d) => (
                <li key={d.doctor}>
                  <a href={d.url} className="underline" target="_blank" rel="noopener noreferrer">
                    {d.doctor}
                  </a>{" "}
                  at {d.hospital}
                </li>
              ))}
            </ul>
          </div>
        ),
      };
    }
    return {
      status: "Unknown Result",
      desc: "Couldn't interpret the prediction.",
      img: images.healthy,
      advice: null,
    };
  };

  // Validate all inputs are completed
  const isInputValid = () => {
    return input.every((val) => val !== "" && val !== null && val !== undefined);
  };

  // Submit prediction request
  const handleSubmit = async (vals) => {
    setError(null);
    setResultData(null);

    if (!isInputValid()) {
      setError("Please fill in all required fields correctly before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Construct features object expected by backend
      const features = {};
      fields.forEach((fieldObj, index) => {
        let value = vals[index];
        const key = fieldObj.name.toUpperCase(); // Normalize key casing UPPERCASE for backend match

        if (key === "GENDER") {
          if (typeof value === "string") {
            value = value.toUpperCase() === "M" ? 1 : 0;
          }
        }

        // Convert empty string to 0
        features[key] =
          typeof value === "string" && value.trim() === "" ? 0 : Number(value) || value;
      });

      console.log("Payload to backend:", features); // For debugging

      const resp = await axios.post(
        "http://localhost:5000/api/predict",
        { features },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
         console.log(resp)
     if (resp.status === 200 && resp.data && resp.data.output && "prediction" in resp.data.output) {
  setResultData(interpretResult(resp.data.output.prediction));
  setHistory((curr) => [
    ...curr,
    {
      input: vals,
      output: resp.data.output.prediction,
      at: new Date().toLocaleString(),
    },
  ]);
} else {
  setResultData({
    status: "API Error",
    desc: resp.data.error || "Check server logs",
    img: "",
    advice: null,
  });
}

    } catch (err) {
      setResultData({
        status: "Connection Error",
        desc: err.response?.data?.error || err.message,
        img: "",
        advice: null,
      });
    }

    setLoading(false);
  };

  // Clear form to retest
  const handleRetest = () => {
    setResultData(null);
    setError(null);
    setInput(Array(fields.length).fill(""));
  };

  // Show/hide history and fetch from API if needed
  const handleShowHistory = async () => {
    if (!userToken) {
      alert("You must be logged in to view history.");
      return;
    }
    if (!showHistory) {
      setLoading(true);
      try {
        const resp = await axios.get("http://localhost:5000/api/predict/history", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setHistory(resp.data.data || []);
      } catch (error) {
        console.error("Error fetching prediction history:", error);
        alert("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    }
    setShowHistory((prev) => !prev);
  };
  console.log(resultData)

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-200 via-sky-300 to-blue-200 transition-colors duration-700 px-2 sm:px-4 md:px-8">
        <CloudBackground />
        <div className="w-full max-w-3xl mt-12 mb-12 p-6 sm:p-8 bg-white/80 backdrop-blur rounded-3xl shadow-2xl border border-sky-100 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-700 mb-6 sm:mb-8 text-center drop-shadow-sm tracking-tight">
            Lung Cancer Prediction
          </h2>

          {error && (
            <div className="mb-4 p-3 text-red-700 font-semibold border border-red-300 rounded bg-red-50 text-center">
              {error}
            </div>
          )}

          {!resultData && (
            <>
              <PredictionForm
                fields={fields}
                input={input}
                setInput={setInput}
                loading={loading}
                onSubmit={handleSubmit}
              />
              <button
                type="button"
                className="w-full mt-4 py-2 bg-white text-sky-700 border border-sky-400 rounded-lg font-semibold hover:bg-sky-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleShowHistory}
                disabled={loading}
              >
                {showHistory ? "Hide" : "Show"} History
              </button>
              {showHistory && <PredictionHistory history={history} interpretResult={interpretResult} />}
            </>
          )}

          {resultData && (
            <>
              <PredictionResult
                resultData={resultData}
                onRetest={handleRetest}
                onShowHistory={handleShowHistory}
                showHistory={showHistory}
                history={history}
                interpretResult={interpretResult}
              />
              {showHistory && <PredictionHistory history={history} interpretResult={interpretResult} />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
