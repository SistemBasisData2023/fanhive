import { db } from "../index.js";
import jwt from "jsonwebtoken";

export const getFollows = (req, res) => {
  const q = `SELECT Followers.followerID 
    FROM Followers 
    INNER JOIN Users ON Followers.followedID = Users.userID
    WHERE Users.username = $1;`;

  db.query(q, [req.params.username], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.rows.map((follow) => follow.followerid));
  });
};

export const addFollows = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token is invalid!");

    const getIdFromNameQ = `SELECT userID FROM Users WHERE username = $1;`;
    db.query(getIdFromNameQ, [req.params.username], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.rows.length < 1)
        return res.status(404).json("User not found!");

      const followedID = result.rows[0].userid;
      const addQ = `INSERT INTO followers (followerID, followedID) VALUES ($1, $2);`;
      db.query(addQ, [userInfo.id, followedID], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Followed!");
      });
    });
  });
};

export const deleteFollows = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token is invalid!");

    const getIdFromNameQ = `SELECT userID FROM Users WHERE username = $1;`;
    db.query(getIdFromNameQ, [req.params.username], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.rows.length < 1)
        return res.status(404).json("User not found!");

      const followedID = result.rows[0].userid;
      const deleteQ = `DELETE FROM Followers WHERE followerID = $1 AND followedID = $2;`;
      db.query(deleteQ, [userInfo.id, followedID], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollowed!");
      });
    });
  });
};
