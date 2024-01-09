import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useBooks } from "../context/booksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export const BookFormPage = () => {
  const { createBook, getBook, updateBook } = useBooks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log("DATA UPDATE:", data)
        updateBook(params.id, {
          ...data
        });
      } else {
        console.log("DATA:", data);
        createBook({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/my-books");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadBook = async () => {
      console.log("PARAMS", params)
      if (params.id) {
        const book = await getBook(params.id);
        setValue("title", book.title);
        setValue("description", book.book_description);
      }
    };
    loadBook();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="cover">Cover</Label>
        <Input type="file" name="cover" {...register("cover")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
};
