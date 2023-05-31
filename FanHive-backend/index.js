import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/stories.js";
import heartRoutes from "./routes/hearts.js";
import commentRoutes from "./routes/comments.js";
import bp from "body-parser";
import cors from "cors";
import pg from "pg";
import cookieParser from "cookie-parser";

const { Client } = pg;

export const db = new Client({
  //Tambahkan parameter yang sesuai untuk melakukan koneksi dengan database
  user: "satyaananda65",
  host: "ep-ancient-feather-555124.ap-southeast-1.aws.neon.tech",
  database: "db_fanhive",
  password: "hZe3ab0CGUFr",
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

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/fic", storyRoutes);
app.use("/hearts", heartRoutes);
app.use("/comments", commentRoutes);

app.listen(8041, () => {
  console.log("Server running at port 8041");
});
