 import healthyLungs from '../assets/healthylungs.jpg'
import diseseslungs from '../assets/healthylungs.jpg'
import {lungSpecialists} from '../utils/config.jsx'

 export default function interpretResult(mlValue){

  let mlValue1;

  if(Array.isArray(mlValue))
  {
     mlValue1=mlValue[0]
  }

    if (mlValue1.prediction === 0) {
      return {
        status: "Lungs Healthy",
        probability:mlValue.probability,
        desc: "Great! Your lungs appear healthy. Maintain this by regular exercise and a healthy lifestyle.",
        img: <img src={healthyLungs} alt="healthy Lungs img" />,
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
    if (mlValue1.prediction === 1) {
      return {
        status: "Lung Cancer Detected",
        probability:mlValue.probability,
        desc: "Warning: The results indicate a high likelihood of lung cancer.",
        img: <img src={diseseslungs} alt="diseseslungs img" />,
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
      status: 'Sorry Try again later !!!'
    };
  };
