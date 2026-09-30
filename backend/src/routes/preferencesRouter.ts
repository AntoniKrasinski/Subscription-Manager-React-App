import e from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  setPreferences,
  getPreferences,
  editPreferences,
} from "../controllers/preferencesController";

const router = e.Router();

router.use(authMiddleware);

router.get("/", getPreferences);

router.post("/", setPreferences);

router.patch("/", editPreferences);

export default router;
