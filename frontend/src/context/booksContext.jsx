import { createContext, useContext, useState } from "react";
import {
  createBookByUserRequest,
  getBooksByUserRequest,
  deleteBookByUserRequest,
  getBookByUserRequest,
  updateBookByUserRequest,
} from "../api/books";

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a TaskProvider");
  return context;
};

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  const getBooks = async (data) => {
    const res = await getBooksByUserRequest(data);
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    try {
      const res = await deleteBookByUserRequest(id);
      if (res.status === 204) setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createBook = async (data) => {
    try {
      console.log("book", data);
      const res = await createBookByUserRequest(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBook = async (id) => {
    try {
      const res = await getBookByUserRequest(id);
      console.log("book: ", res.data[0]);
      return res.data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const updateBook = async (id, book) => {
    try {
      await updateBookByUserRequest(id, book);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getBooks,
        deleteBook,
        createBook,
        getBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
