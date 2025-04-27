import express from "express";
import cors from "cors";
import dbConnection from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...")
});

app.listen(PORT, async() => {
    try {
        await dbConnection;
        console.log("Connected to MongoDB");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        
    }
});