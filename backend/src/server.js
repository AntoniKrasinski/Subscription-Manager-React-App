import e from "express";
import authRoutes from "./routes/authRouter.js";
import cors from "cors";

const port = 3000;

const app = e();
app.use(cors());
app.use(e.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.use("/auth", authRoutes);
