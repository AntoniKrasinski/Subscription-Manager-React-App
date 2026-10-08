import e from "express";
import {
  addSubscription,
  getAllSubscriptions,
  getSubscription,
  editSubscription,
  deleteSubscription,
  getLogo,
} from "../controllers/subscriptionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = e.Router();

router.use(authMiddleware);

router.post("/", addSubscription);
router.get("/", getAllSubscriptions);

router.get("/:id", getSubscription);
router.patch("/:id", editSubscription);
router.delete("/:id", deleteSubscription);
router.get("/logo/:name", getLogo);

export default router;
