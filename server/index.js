import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("err");
  });

const app = express();

app.use(express.json());
app.listen(7000, () => {
  console.log("server is running on port 7000");
});

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
