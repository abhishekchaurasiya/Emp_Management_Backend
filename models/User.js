import { model, Schema } from "mongoose";
import Collection from "../utils/collections.js";
import { Role } from "../utils/commonUtils.js";

const userShcema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: [Role.admin, Role.employee],
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    cloudinaryId: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true, id: false }
);

const User = model(Collection.User, userShcema);
export default User;
