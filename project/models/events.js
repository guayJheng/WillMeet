import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
