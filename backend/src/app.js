import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API is running" }));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;