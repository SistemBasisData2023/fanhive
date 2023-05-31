import { db } from "../index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check whether user exists from PostgreSQL
  const q = `SELECT * FROM users WHERE username = $1`;

  // Query from db to check whether user exists
  db.query(q, [req.body.username], (err, result) => {
    // If error, return error
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    // If user exists, return error
    if (result.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    // If user doesn't exist, hash password into a variable called const hashedPassword using bcryptjs
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      // If error, return error
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      // If no error, insert user into PostgreSQL
      const q = `INSERT INTO users (username, password, email) VALUES ('${req.body.username}', '${hashedPassword}', '${req.body.email}')`;
      // Query from db to insert user
      db.query(q, (err, result) => {
        // if error, return error
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        // if no error, return success message
        return res.status(201).json({ message: "User created" });
      });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = $1";
  db.query(q, [req.body.username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      result.rows[0].password
    );

    if (!comparePassword)
      return res
        .status(400)
        .json({ message: "Username or password is incorrect!" });

    const token = jwt.sign({ id: result.rows[0].userid }, "secret");

    const { password, ...user } = result.rows[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("You have been logged out.");
};
