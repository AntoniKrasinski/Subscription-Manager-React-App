import e from "express";
import authRoutes from "./routes/authRouter.ts";
import subscriptionRoutes from "./routes/subscriptionRouter.ts";
import preferencesRoutes from "./routes/preferencesRouter.ts";
import statsRoutes from "./routes/statsRouter.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./prisma/db.ts";

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = e();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running.`);
});

app.use("/auth", authRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/stats", statsRoutes);
