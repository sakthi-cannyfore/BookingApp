import express from "express";
import dontenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.js";
import HotelRoute from "./routes/Hotel.js";
import RoomsRoute from "./routes/Rooms.js";
import UsersRoute from "./routes/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

dontenv.config();

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    // console.log("connected to MongoDB")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb Disconnected !");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDb connected👍");
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/hotels", HotelRoute);
app.use("/api/rooms", RoomsRoute);

app.use((err, req, res, next) => {
  const errorStatusCode = err.status || 500;
  const errorMessage = err.message || "Something went Wrong !";
  res.status(errorStatusCode).json({
    success: false,
    status: errorStatusCode,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = 8081;

app.listen(PORT, () => {
  mongodb();
  console.log("backend server connected Successfully 👍");
});
