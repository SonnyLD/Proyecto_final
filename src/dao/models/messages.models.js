import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model("Message", schema);
export default MessageModel;