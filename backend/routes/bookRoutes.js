import express from "express";
import {
  createBookByUser,
  getBooksByUser,
  getBookByUser,
  deleteBookByUser,
  updateBookByUser,
} from "../controllers/bookController.js";
import { protect } from "../controllers/authController.js";

const bookRouter = express.Router();

bookRouter
  .get("/", protect, getBooksByUser)
  .post("/", protect, createBookByUser);

bookRouter
  .get("/:id", protect, getBookByUser)
  .patch("/:id", protect, updateBookByUser)
  .delete("/:id", deleteBookByUser);

export default bookRouter;
