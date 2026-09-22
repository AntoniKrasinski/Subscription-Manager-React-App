import e from "express";
import {
  register,
  login,
  logout,
  refresh,
  me,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = e.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refresh);

router.get("/me", authMiddleware, me);

export default router;
