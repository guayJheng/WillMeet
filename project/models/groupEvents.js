import mongoose, { Schema } from "mongoose";

const groupEventSchema = new Schema(
  {
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
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

const GroupEvent =
  mongoose.models.GroupEvent || mongoose.model("GroupEvent", groupEventSchema);
export default GroupEvent;
