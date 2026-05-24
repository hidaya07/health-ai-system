import { useState } from "react";

const symptomList = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Body Pain",
  "Sore Throat",
  "Muscle Pain",
  "Chills"
];

export default function DiagnosticForm({ onSubmit }) {
  const [age, setAge] = useState(18);
  const [weightLoss, setWeightLoss] = useState("");
  const [weightGain, setWeightGain] = useState("");
  const [appetiteLoss, setAppetiteLoss] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState("");

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (!weightLoss || !weightGain || !appetiteLoss || symptoms.length === 0) {
      alert(
        "Please complete all required fields and select at least one symptom to continue."
      );
      return;
    }

    onSubmit({
      age,
      weightLoss,
      weightGain,
      appetiteLoss,
      symptoms: customSymptom
        ? [...symptoms, customSymptom]
        : symptoms
    });
  };

  return (
    <div>

      {/* 🔥 HEADER (NEW DESIGN) */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "5px"
          }}
        >
          <span style={{ fontSize: "26px" }}>🩺</span>

          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              color: "#6c5ce7"
            }}
          >
            Health Assessment
          </h2>
        </div>

        <p style={{ fontSize: "13px", color: "#777" }}>
          Help us understand your symptoms
        </p>
      </div>

      {/* AGE */}
      <div className="field">
        <label>Age</label>
        <div className="age-box">
          <button onClick={() => setAge(age - 1)}>-</button>
          <span>{age}</span>
          <button onClick={() => setAge(age + 1)}>+</button>
        </div>
      </div>

      {/* WEIGHT LOSS */}
      <div className="field">
        <label>Have you experienced weight loss?</label>
        <div className="options">
          <button
            className={weightLoss === "yes" ? "active" : ""}
            onClick={() => setWeightLoss("yes")}
          >
            Yes
          </button>
          <button
            className={weightLoss === "no" ? "active" : ""}
            onClick={() => setWeightLoss("no")}
          >
            No
          </button>
        </div>
      </div>

      {/* WEIGHT GAIN */}
      <div className="field">
        <label>Have you gained weight?</label>
        <div className="options">
          <button
            className={weightGain === "yes" ? "active" : ""}
            onClick={() => setWeightGain("yes")}
          >
            Yes
          </button>
          <button
            className={weightGain === "no" ? "active" : ""}
            onClick={() => setWeightGain("no")}
          >
            No
          </button>
        </div>
      </div>

      {/* APPETITE LOSS */}
      <div className="field">
        <label>Have you lost appetite?</label>
        <div className="options">
          <button
            className={appetiteLoss === "yes" ? "active" : ""}
            onClick={() => setAppetiteLoss("yes")}
          >
            Yes
          </button>
          <button
            className={appetiteLoss === "no" ? "active" : ""}
            onClick={() => setAppetiteLoss("no")}
          >
            No
          </button>
        </div>
      </div>

      {/* SYMPTOMS */}
      <div className="field">
        <label>Select Symptoms</label>

        <div className="symptoms">
          {symptomList.map((s) => (
            <div
              key={s}
              className={symptoms.includes(s) ? "symptom active" : "symptom"}
              onClick={() => toggleSymptom(s)}
            >
              {s}
            </div>
          ))}
        </div>

        <input
          placeholder="Or add custom symptom..."
          value={customSymptom}
          onChange={(e) => setCustomSymptom(e.target.value)}
        />
      </div>

      {/* WARNING */}
      <p className="warning">
        Please complete all required fields and select at least one symptom to continue.
      </p>

      {/* BUTTON */}
      <button className="btn" onClick={handleSubmit}>
        Run Diagnosis
      </button>

    </div>
  );
}