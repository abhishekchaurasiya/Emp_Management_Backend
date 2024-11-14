import { model, Schema } from "mongoose";

const settingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    old_password: {
      type: String,
      required: true,
      trim: true,
    },
    new_password: {
      type: String,
      required: true,
      trim: true,
    },
    confirm_password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Setting = model("Setting", settingSchema);
export default Setting;
