//business logic

import { user } from "../modals/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//   register
export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are reqiured" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Do not Match" });
    }

    const User = await user.findOne({ username });
    if (User) {
      return res
        .status(400)
        .json({ message: "Username Alreday Exist try different" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //profile photo

    const maleProfilePhotot = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhotot = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await user.create({
      fullname,
      username,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhotot : femaleProfilePhotot,
      gender,
    });
    return res
      .status(201)
      .json({ message: "Account Created Succefully", success: true });
  } catch (error) {
    console.log("Error: " + error.message);
  }
};




//login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are reqiured" });
    }

    //chech if username found or not
    const User = await user.findOne({ username });
    if (!User) {
      return res.status(400).json({
        message: "Incorrect username or passwword",
        success: false,
      });
    }

    //chech if password matches or not
    const isPasswordMatch = await bcrypt.compare(password, User.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or passwword",
        success: false,
      });
    }

    //jwt Token
    const tokenData = {
      userId: User._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    //const toke = xy(token)
    return res.status(200).cookie("token", token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
      _id:User._id,
      username: User.username,
      fullname:User.fullname,
      profilePhoto:User.profilePhoto,
      success:true
    });
  } catch (error) {
    console.log(error.message);
  }
};
