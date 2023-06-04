import { db } from "../index.js";
import jwt from "jsonwebtoken";

export const getHearts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(400).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const q = `SELECT userID FROM Heart WHERE storyID = $1`;

    db.query(q, [req.params.sid], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result.rows.map((heart) => heart.userid));
    });
  });
};

export const addHeart = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(400).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const q = `INSERT INTO Heart (storyID, userID) VALUES ($1, $2)`;

    db.query(q, [req.params.sid, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Fic Hearted!");
    });
  });
};

export const deleteHeart = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(400).json("Not logged in!");

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.status(403).json("Access token invalid!");

    const q = `DELETE FROM Heart WHERE storyID = $1 AND userID = $2`;

    db.query(q, [req.params.sid, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Fic Disheartened!");
    });
  });
};
