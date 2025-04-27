import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    about: { 
        type: String, 
        default: "Hey there! I am using ChatBridge." 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
