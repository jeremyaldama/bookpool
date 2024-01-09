// const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import { TOKEN_SECRET, TOKEN_EXPIRES_IN } from "../config.js";

const signToken = (id) => {
  console.log("ID:", id);
  console.log(TOKEN_SECRET);
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  // el token es un string que recibe el frontend y él me lo tiene que devolver
  // para saber si tiene autorización
  console.log("creasendtoken", user);
  const token = signToken(user.insertId ? user.insertId : user.id);
  // no es necesario enviar el token al cliente porque podemos usar una cookie
  // para guardarlo
  // express ya tiene cookie, lo enviamos al Header
  res.cookie("token", token, {
    // no está en el mismo dominio
    sameSite: "none",
    secure: true,
  });

  res.status(statusCode).json({
    id: user.id,
    username: user.username,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return next(new AppError("Password must be equal", 400));
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  console.log(rows);
  if (rows[0]) {
    return next(new AppError("Username is already in use", 400));
  }

  const passHash = await bcrypt.hash(password, 10);
  const [user] = await pool.query(
    "INSERT INTO users(username, hash_password) VALUES(?, ?);",
    [username, passHash]
  );
  console.log("USER", user);
  createSendToken(user, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) Check if email and password exist
  if (!username || !password) {
    return next(new AppError("Please provide username and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    username
  );
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.hash_password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

export const logout = (req, res) => {
  res.cookie("token", "loggedout", {
    // httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ status: "success" });
};

export const verifyToken = async (req, res, next) => {
  console.log("COOKIES", req.cookies);
  const { token } = req.cookies;
  if (!token) return res.send(400);

  jwt.verify(token, TOKEN_SECRET, async (error, data) => {
    if (error) return res.sendStatus(401);
    console.log(data);
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      data.id
    );
    const userFound = rows[0];
    if (!userFound) return res.status(401);
    next();
  });
};

export const profile = catchAsync(async (req, res, next) => {
  console.log(req.user.id);
  const [user] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    req.user.id
  );
  console.log(user[0]);
  res.status(200).json({
    success: "success",
    id: user[0].id,
    username: user[0].username,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  // cookie-parser nos ayuda a poder leer las cookies como si fueran string
  const { token } = req.cookies;
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
});
