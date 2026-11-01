import e from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getSubscriptionsStats } from "../controllers/statsController";
import { getCategoriesStats } from "../controllers/statsController";

const router = e.Router();

router.use(authMiddleware);

router.get("/subscriptions", getSubscriptionsStats);

router.get("/categories", getCategoriesStats)

export default router;
