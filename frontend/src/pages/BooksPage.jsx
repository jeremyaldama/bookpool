import { useEffect } from "react";
import { BookCard } from "../components/books/BookCard";
import { ImFileEmpty } from "react-icons/im";
import { useBooks } from "../context/booksContext";

export function BooksPage() {
  const { books, getBooks } = useBooks();

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      {books.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No books yet, please add a new book
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </>
  );
}
