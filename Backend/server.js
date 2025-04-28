import express from "express";
import cors from "cors";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import { Server } from "socket.io";
import socketServer from "./socket/socket.js";
import messageRouter from "./routes/message.route.js";
import groupRouter from "./routes/group.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.io = io;  
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoute);
app.use('/api/messages', messageRouter);
app.use('/api/groups', groupRouter);

const server = app.listen(PORT, async () => {
  try {
    await dbConnection;
    console.log("Connected to MongoDB");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
  transports: ["websocket", "polling"],
});

socketServer(io);
