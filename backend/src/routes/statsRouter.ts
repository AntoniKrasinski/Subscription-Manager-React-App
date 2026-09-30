import e from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getSubscriptionsStats } from "../controllers/statsController";

const router = e.Router();

router.use(authMiddleware);

router.get("/subscriptions", getSubscriptionsStats);

export default router;
