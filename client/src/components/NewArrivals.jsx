import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import { fetchBooks } from "../features/books/bookThunk";

const NewArrivals = () => {
  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleBooks, setVisibleBooks] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset visible books when category changes and set initial count
  useEffect(() => {
    if (isMobile) {
      setVisibleBooks(4); // Mobile: show 4 books initially
    } else {
      setVisibleBooks(8); // Desktop: show 8 books initially (2 rows × 4 books)
    }
  }, [activeCategory, isMobile]);

  // Filter books based on active category
  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);

  // Get books to display
  const booksToShow = filteredBooks.slice(0, visibleBooks);

  // Load more books
  const loadMoreBooks = () => {
    if (isMobile) {
      setVisibleBooks((prev) => prev + 4);
    } else {
      setVisibleBooks((prev) => prev + 4);
    }
  };

  // Check if there are more books to load
  const hasMoreBooks = visibleBooks < filteredBooks.length;

  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Children",
    "Fantasy",
    "Thriller",
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[26px] font-bold text-bilbao-700 mb-6 tracking-wider">
          NEW ARRIVALS
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`btn btn-sm hover:bg-bilbao-900 ${
                activeCategory === category
                  ? "btn bg-bilbao-700 text-white"
                  : "border border-black/20 bg-white hover:text-white"
              } px-4`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {booksToShow.map((book) => (
            <BookCard key={book._id} book={book}/>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMoreBooks && (
        <div className="text-center mt-12">
          <button
            className="border border-bilbao-700 text-bilbao-700 hover:bg-bilbao-700 hover:text-white font-medium py-2 px-8 rounded-lg transition duration-200 cursor-pointer"
            onClick={loadMoreBooks}
          >
            Load More Books
          </button>
        </div>
      )}
      {/* No more books message */}
      {!hasMoreBooks && filteredBooks.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600">
            No more books to show in this category.
          </p>
        </div>
      )}
      {/* No books found message */}
      {filteredBooks.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600">No books found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
