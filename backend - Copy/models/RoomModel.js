import mongoose from "mongoose";

const RoomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pice: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomeSchema);
