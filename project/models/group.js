import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
  groupName: {
    type: String,
  },
  groupData: {
    type: mongoose.Schema.Types.ObjectId,
  },
  groupMembers: {
    type: Array,
  },
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);
export default Group;
