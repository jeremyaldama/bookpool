import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somenthing went wrong",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length <= 0) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      rows: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, pass } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO users(username, pass) VALUES(?, ?);",
      [name, pass]
    );
    res.status(201).json({
      rows,
      id: rows.insertId,
      name,
      pass,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
