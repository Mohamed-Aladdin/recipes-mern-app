import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// ENV Config
dotenv.config({ path: "./src/config/config.env" });

// Connect to the DB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`${process.env.NODE_ENV} server started on port ${PORT}`)
);
