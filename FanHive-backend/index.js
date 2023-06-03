import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/stories.js";
import heartRoutes from "./routes/hearts.js";
import commentRoutes from "./routes/comments.js";
import followRoutes from "./routes/follows.js";
import bp from "body-parser";
import cors from "cors";
import pg from "pg";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";

const { Client } = pg;
dotenv.config();
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

export const db = new Client({
  // Credential for establishing connection
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
});

export const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../FanHive-frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(200).json({ message: "No file uploaded" });
  } else {
    res.status(200).json(file.filename);
  }
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/fic", storyRoutes);
app.use("/hearts", heartRoutes);
app.use("/comments", commentRoutes);
app.use("/follows", followRoutes);

app.listen(8041, () => {
  console.log("Server running at port 8041");
});
