import express from "express";
import router from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes
app.use("/api/users", router);

export default app;
