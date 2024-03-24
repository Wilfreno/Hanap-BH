import mongoose, { Schema } from "mongoose";

const OTPSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    expires: 60 * 5,
  },
});

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
