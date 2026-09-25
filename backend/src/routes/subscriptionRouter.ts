import e from "express";
import {
  addSubscription,
  getAllSubscriptions,
  getSubscriptionsStats,
  getSubscription,
  editSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = e.Router();

router.use(authMiddleware);

router.post("/", addSubscription);
router.get("/", getAllSubscriptions);
router.get("/stats", getSubscriptionsStats);

router.get("/:id", getSubscription);
router.patch("/:id", editSubscription);
router.delete("/:id", deleteSubscription);

export default router;
