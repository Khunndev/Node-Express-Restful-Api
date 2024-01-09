import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import path from "path";

// routes
import indexRouter from "./routes/index";
import categoryRouter from "./routes/v1/category";
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use("/", indexRouter); //localhost:4000
app.use("/api/v1/category", categoryRouter); //localhost:4000/api/v1/category
app.listen(port, () => {
  console.log(
    `[${process.env.COMPANY_NAME} server]: Server is running at http://localhost:${port}`
  );
});
