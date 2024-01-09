import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

// para que se pueda acceder desde otros puertos
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

// para ver las peticiones que se piden al server
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
export default app;
