import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";
import CloudBackground from "../components/cloudBackground";
import PredictionForm from "../components/predictionForm";
import PredictionResult from "../components/predictionResult";
import PredictionHistory from "../components/predictionHistory";
import { fields} from "../utils/config";
import axios from '../config/apiInstance'
import { API_ENDPOINTS } from '../constants/api';
import interpretResult from '../utils/mlResult'

export default function LungCancerPredictPage() {
  
  const [input, setInput] = useState(Array(fields.length).fill(""));
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(null);
  const [tokenStatus,setTokenStatus]=useState('')

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");


  useEffect(() => {
async function tokenStatus(){
  try{
     const res= await axios.post(API_ENDPOINTS.CHECK_TOKEN_STATUS,{},{headers:{Authorization:`Bearer ${userToken}`}})
     console.log(res.data)
    }catch(err)
    {
      if(err.response && err.status===401)
      {
        setTokenStatus({msg:err.response.data.error})
      }
    }
  }
  tokenStatus()
  }, [userToken]);


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
        const key = fieldObj.name.toUpperCase(); 
        features[key] = value
       });

 
      const resp = await axios.post(
       API_ENDPOINTS.PREDICT,
        { features },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
        
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

 
  const handleShowHistory = async () => {
    if (!userToken) {
      alert("You must be logged in to view history.");
      return;
    }
    if (!showHistory) {
      setLoading(true);
      try {
        const resp = await axios.get(API_ENDPOINTS.PREDICT_HISTORY, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setHistory(resp.data.data || []);
      } catch (error) {
        console.error("Error fetching prediction history:", error);
        setHistory({msg:error.response.data.error})
        console.log(history)
      } finally {
        setLoading(false);
      }
    }
    setShowHistory((prev) => !prev);
  };
 


  return (
    <>
    {tokenStatus===''?<><Navbar />
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
            </>
          )}
        </div>
      </div></>:<div className="flex gap-3 m-5"><p>{tokenStatus.msg}</p><p><a className="text-blue-400 underline" href="/login">Login</a></p></div>}
      
    </>
  );
}
