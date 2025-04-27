import express from "express";
import cors from "cors";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...")
});
app.use("/api/users", userRoute);

app.listen(PORT, async() => {
    try {
        await dbConnection;
        console.log("Connected to MongoDB");
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});