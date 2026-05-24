import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    disease: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    symptoms: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;