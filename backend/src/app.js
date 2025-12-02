import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
