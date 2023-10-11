import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: String,
  comment: String
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;