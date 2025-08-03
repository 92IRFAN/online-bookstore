import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookThunk";

const RelatedBook = ({ category, currentBookId }) => {
  const [relatedBooks, setRelatedBooks] = useState([]);

  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  // Only fetch books if not already fetched
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [books.length, dispatch]);

  useEffect(() => {
    const filteredBooks = books
      .filter(
        (book) => book.category === category && book._id !== currentBookId
      )
      .slice(0, 4);
      
    setRelatedBooks(filteredBooks);
  }, [books, category, currentBookId]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedBook;
