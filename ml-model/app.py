from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# LOAD TRAINED MODEL
model = joblib.load("malaria_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # PATIENT FEATURES
    features = np.array([[
        data["fever"],
        data["chills"],
        data["sweating"],
        data["headache"],
        data["nausea"],
        data["body_pain"],
        data["fatigue"]
    ]])

    # =========================
    # ML PREDICTION
    # =========================
    prediction = model.predict(features)[0]

    # =========================
    # REAL CONFIDENCE SCORE
    # =========================
    probabilities = model.predict_proba(features)[0]

    confidence = float(max(probabilities))

    # =========================
    # FINAL RESPONSE
    # =========================
    return jsonify({
        "disease": "Malaria" if prediction == 1 else "No Malaria",
        "confidence": round(confidence, 2)
    })

# RUN SERVER
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)