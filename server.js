import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import Prediction from "./models/Prediction.js";
import axios from "axios";

import http from "http";
import { Server } from "socket.io";

// =======================
// CONFIG
// =======================
dotenv.config();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// AUTH ROUTES
// =======================
app.use("/api/auth", authRoutes);

// =======================
// MONGODB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 🚀"))
  .catch((err) => console.log("MongoDB error:", err));

// =======================
// GET PREDICTION HISTORY
// =======================
app.get("/api/predictions/:userName", async (req, res) => {
  try {
    const history = await Prediction.find({
      userName: req.params.userName,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// ML PREDICTION ROUTE
// =======================
app.post("/api/predict", async (req, res) => {
  try {
    // CALL FLASK ML SERVER
    const response = await axios.post(
      "http://localhost:5002/predict",
      req.body
    );

    const data = response.data;

    // SAFE CONFIDENCE CHECK
    const confidence = data?.confidence ?? 0;
    const isLow = confidence < 0.75;

    // SAVE TO MONGODB
    await Prediction.create({
      userName: req.body.userName || "Guest",
      disease: data.disease,
      confidence: confidence,
      status: isLow ? "low_confidence" : "high_confidence",
      symptoms: req.body,
    });

    // RESPONSE TO FRONTEND
    if (isLow) {
      return res.json({
        disease: data.disease,
        confidence: confidence,
        status: "low_confidence",
        message: "⚠️ Low confidence result",
        advice: "Please consult a doctor",
        options: {
          chat: "Chat with doctor",
          video: "Video consultation",
        },
      });
    }

    return res.json({
      disease: data.disease,
      confidence: confidence,
      status: "high_confidence",
      message: "✔ Prediction successful",
    });
  } catch (error) {
    console.error("Prediction error:", error.message);

    return res.status(500).json({
      message: "Prediction failed",
      error: error.message,
    });
  }
});

// =======================
// SOCKET.IO SETUP
// =======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});