import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//@desc Register user
//@route POST /api/user/register
//@access Public
const registerUser = async (req, res) => {
    try {
        const { name, mobileNumber, password } = req.body;
        if (!name || !mobileNumber || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ mobileNumber });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        const newUser = await User.create({ name, mobileNumber, password: hashedPassword });
        if(newUser){
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            return res.status(201).json({      
                _id: newUser._id,
                name: newUser.name,
                mobileNumber: newUser.mobileNumber,
                profilePic: newUser.profilePic,
                about: newUser.about,
                token
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// @desc Login user
// @route POST /api/user/login
// @access Public

const loginUser = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;
        if (!mobileNumber || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            mobileNumber: user.mobileNumber,
            profilePic: user.profilePic,
            about: user.about,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { registerUser, loginUser, getUserProfile };