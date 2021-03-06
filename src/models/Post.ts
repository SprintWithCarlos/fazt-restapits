import { Schema, model } from "mongoose";
import { type } from "os";
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    img: { type: String, required: true }
  },
  { timestamps: true }
);
export default model("Post", PostSchema);
