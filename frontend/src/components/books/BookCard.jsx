import { useBooks } from "../../context/booksContext";
import { Button, ButtonLink, Card } from "../ui";

export function BookCard({ book }) {
  const { deleteBook } = useBooks();

  return (
    <Card>
      <header className="flex flex-col gap-y-5 justify-between">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-balck-300">{book.book_description}</p>
        <div className="flex gap-x-2 items-center">
          <Button
            onClick={() => {
              deleteBook(book.id);
              
            }}
          >
            Delete
          </Button>
          <ButtonLink to={`/my-books/${book.id}`}>Edit</ButtonLink>
        </div>
      </header>
    </Card>
  );
}
