import e from "express";
import authRoutes from "./routes/authRouter.js";
import cors from "cors";
import { db } from "./prisma/db.js";

const app = e();
app.use(cors()); //ToDo: Allow only server from .env file
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.use("/auth", authRoutes);
