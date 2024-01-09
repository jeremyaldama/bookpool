import express from "express";
import {
  createUser,
  getUsers,
  getUser,
} from "./../controllers/userController.js";
import {
  signup,
  login,
  logout,
  verifyToken,
  protect,
  profile,
} from "./../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", verifyToken, logout);
userRouter.get("/verify", verifyToken);

userRouter.get("/profile", protect, profile);

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUser);

export default userRouter;
