import { Router } from "express";
import {
  createUser,
  logoutUser,
  userLogin,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/logout", logoutUser);

export default router;
