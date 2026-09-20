import e from "express";
import { addSubscription } from "../controllers/subscriptionController.js";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = e.Router();

router.use(authMiddleware);

router.post("/", addSubscription);



export default router;
