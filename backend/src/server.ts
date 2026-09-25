import e from "express";
import authRoutes from "./routes/authRouter.ts";
import subscriptionRoutes from "./routes/subscriptionRouter.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./prisma/db.ts";

const app = e();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.use("/auth", authRoutes);
app.use("/subscriptions", subscriptionRoutes);
