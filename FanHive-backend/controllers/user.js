import { db } from "../index.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(400).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const userName = req.params.username;
    const q = `SELECT *,
      (SELECT COUNT(*) FROM Followers WHERE followerID = Users.userID) AS followingCount,
      (SELECT COUNT(*) FROM Followers WHERE followedID = Users.userID) AS followerCount
      FROM Users
      WHERE Users.username = $1;`;

    db.query(q, [userName], (err, result) => {
      if (err) return res.status(500).json({ message: "Something went wrong" });
      const { password, ...user } = result.rows[0];
      return res.json(user);
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(400).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const q = `UPDATE users SET cover_pic = $1, profile_pic = $2 WHERE userid = $3;`;
    db.query(
      q,
      [req.body.cover_pic, req.body.profile_pic, userInfo.id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.rowCount > 0) return res.json("Updated!");
        return res.status(403).json("Updating this user is forbidden!");
      }
    );
  });
};
