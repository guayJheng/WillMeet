import mongoose, { Schema } from "mongoose";

const groupDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    allDay: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const groupData =
  mongoose.models.groupData || mongoose.model("groupData", groupDataSchema);
export default groupData;
