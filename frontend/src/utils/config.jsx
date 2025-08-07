export const images = {
  healthy: "https://cdn.pixabay.com/photo/2014/04/05/11/38/meditation-316166_1280.jpg",
  moderate: "https://cdn.pixabay.com/photo/2016/11/29/04/17/blur-1869211_1280.jpg",
  cancer: "https://cdn.pixabay.com/photo/2017/02/15/10/39/stethoscope-2061021_1280.jpg"
};

export const fields = [
  { name: "AGE", type: "number" },
  { name: "GENDER", type: "select" }, // handled specially
  { name: "SMOKING", type: "yesno" },
  { name: "YELLOW_FINGERS", type: "yesno" },
  { name: "ANXIETY", type: "yesno" },
  { name: "PEER_PRESSURE", type: "yesno" },
  { name: "CHRONIC_DISEASE", type: "yesno" },
  { name: "FATIGUE", type: "yesno" },
  { name: "ALLERGY", type: "yesno" },
  { name: "WHEEZING", type: "yesno" },
  { name: "ALCOHOL_CONSUMING", type: "yesno" },
  { name: "COUGHING", type: "yesno" },
  { name: "SHORTNESS_OF_BREATH", type: "yesno" },
  { name: "SWALLOWING_DIFFICULTY", type: "yesno" },
  { name: "CHEST_PAIN", type: "yesno" },
];


export const healthcareCenters = [
  { name: "Talwalkars Gym", url: "https://www.talwalkars.net/", location: "Bandra West, Mumbai, Maharashtra" },
  { name: "Cult.Fit", url: "https://www.cult.fit/", location: "Koramangala, Bengaluru, Karnataka" }
];
export const lungSpecialists = [
  { doctor: "Dr. Arvind Kumar", url: "https://www.medanta.org/doctor/dr-arvind-kumar/", hospital: "Medanta Hospital, Gurugram" },
  { doctor: "Dr. S.K. Chhabra", url: "https://www.blkhospital.com/doctors/dr-s-k-chhabra/", hospital: "BLK Hospital, New Delhi" }
];
