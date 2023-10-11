import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comments";

// import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  const { id } = request.query;
  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
    // response.status(200).json({ place: place, comments: comments });
  }

  if (request.method === "PATCH") {
    try {
      await Place.findByIdAndUpdate(id, {
        $set: request.body,
      });
      return response
        .status(200)
        .json({ status: "place successfully updated" });
    } catch (e) {
      console.log(e);
    }
  }

  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    await Comment.deleteMany({
      _id: { $in: placeToDelete.comments },
    });
    response.status(260).json("Place and comments deleted");
    return response.status(200).json(placeToDelete);
  }

  // const place = db_places.find((place) => place._id.$oid === id);
  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );
}
