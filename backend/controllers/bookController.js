import { pool } from "../db.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

export const getBooksByUser = catchAsync(async (req, res, next) => {
  const fid_user = req.user.id;
  const [books] = await pool.query(
    `
    SELECT b.id, b.title, b.book_description FROM books b
      INNER JOIN users u ON b.fid_user = u.id
    WHERE u.id = ? AND b.activo = 1;
  `,
    [fid_user]
  );
  console.log(books);
  res.json(books);
});

export const getBookByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [book] = await pool.query(
    `
    SELECT * FROM books 
    WHERE id = ? AND activo = 1;
  `,
    [id]
  );
  console.log(book);
  res.json(book);
});

export const deleteBookByUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const [updated] = await pool.query(
    `
    UPDATE books
    SET activo = 0
    WHERE id = ?;
  `,
    [id]
  );
  console.log(updated);
  res.status(204).json(updated);
});

export const updateBookByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const [updated] = await pool.query(
    `
    UPDATE books
    SET title = ?,
      book_description = ?
    WHERE id = ?;
  `,
    [title, description, id]
  );
  console.log(updated);
  res.json(updated);
});

export const createBookByUser = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const fid_user = req.user.id;
  const [newBook] = await pool.query(
    `INSERT INTO books(title, book_description, fid_user) 
              VALUES (?, ?, ?)`,
    [title, description, fid_user]
  );
  res.json(newBook);
});
