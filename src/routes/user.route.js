import express from "express";

import {
  verifyUser,
  registerUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/verify/:id/:token", verifyUser);

export default router;
