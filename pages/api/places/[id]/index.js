import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

// import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  const { id } = request.query;
  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json({ place: place });
    // response.status(200).json({ place: place, comments: comments });
  }

  // const place = db_places.find((place) => place._id.$oid === id);
  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );
}
