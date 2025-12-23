import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  VideoUrl: { type: String, required: true }
},{ timestamps: true });

videoSchema.index({ createdAt: -1 });
const Video = mongoose.model("Video", videoSchema);

export default Video;
