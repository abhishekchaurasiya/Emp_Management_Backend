import User from "../models/User.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const { userId, old_password, new_password, confirm_password } = req.body;

    if (!userId || !old_password || !new_password || !confirm_password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Old password is incorrect!" });
    }
    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        error: "New password and confirm password do not match!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(new_password, salt);
    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { password: hashPassword } },
      { new: true, runValidators: true }
    );
    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, error: "Update password failed" });
    }
    return res.json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error while changing password" });
  }
};
