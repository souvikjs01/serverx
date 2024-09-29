import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/route.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
