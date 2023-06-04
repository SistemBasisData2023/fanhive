import { db } from "../index.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  const q = `SELECT Users.username, Users.profile_pic, Comments.comment_content
    AS content, Comments.date_posted 
    FROM Comments 
    JOIN Users ON Comments.userID = Users.userID 
    WHERE Comments.storyID = $1
    ORDER BY Comments.date_posted DESC;`;

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.rows);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const storyID = req.params.id;
    const q = `INSERT INTO Comments (userID, storyID, comment_content) 
      VALUES ($1, $2, $3);`;

    db.query(q, [userInfo.id, storyID, req.body.content], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment posted!");
    });
  });
};
