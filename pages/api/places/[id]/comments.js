import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comments";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "POST") {
    try {
      const newComment = await Comment.create(request.body);
      await Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );
      response.status(200).json({ succes: "comment successfully created" });
    } catch (e) {
      console.log(e);
    }
  }

  if (request.method === "DELETE") {
    try {
      console.log("request.body", request.body);
      const commentToDelete = await Comment.findByIdAndDelete(request.body.id);
      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentToDelete._id },
      });
      console.log("commentToDElete", commentToDelete);
      return response
        .status(200)
        .json({ succes: "comment successfully deleted" });
    } catch (e) {
      console.log(e);
    }
  }
}
