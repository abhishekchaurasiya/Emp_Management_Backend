import User from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { Role } from "../utils/commonUtils.js";
import { validateEmail, validatePassword } from "../utils/commonMethod.js";

const secretKey = process.env.JWT_SECRET_KEY;

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!validateEmail(email) || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email address" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Password should be at least 8 characters, at least one letter and one number",
        });
    }

    const exitingUser = await User.findOne({ email: email }).select(
      "email role name"
    );

    if (exitingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: Role.admin,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: `${newUser?.name} registered successfully!`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email address" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, error: "Password is required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ sussess: false, error: "User not found" });
    }

    // match the password user and database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong password!" });
    }

    // Create and generate a token
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = JWT.sign(payload, secretKey, {
      expiresIn: "10d",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
      message: "Login successfully ",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verify = (req, res) => {
  // return res.status(200).json({ success: true, user: req.user, token: req.token })
  return res.status(200).json({ success: true, user: req.user });
};

