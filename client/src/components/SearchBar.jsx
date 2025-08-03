import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../features/books/bookThunk";
import { clearResults } from "../features/books/bookSlice";

const SearchBar = ({ isMobile = false, onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const { searchResults, searchLoading } = useSelector((state) => state.books);

  useEffect(() => {
    if (query.trim().length > 1) {
      dispatch(searchBooks(query.trim()));
    } else {
      dispatch(clearResults());
    }
  }, [query, dispatch]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(clearResults());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      navigate(`/collection?search=${encodeURIComponent(query.trim())}`);
      dispatch(clearResults());
      setQuery("");
      onSearchComplete?.();
    },
    [query, navigate, dispatch, onSearchComplete]
  );

  const handleBookSelect = useCallback(
    (bookId) => {
      // Use setTimeout to ensure the click event completes before navigation
      setTimeout(() => {
        navigate(`/book/${bookId}`);
        setQuery("");
        dispatch(clearResults());
        onSearchComplete?.();
      }, 0);
    },
    [navigate, dispatch, onSearchComplete]
  );

  const handleBookClick = useCallback(
    (e, bookId) => {
      e.preventDefault();
      e.stopPropagation();
      handleBookSelect(bookId);
    },
    [handleBookSelect]
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center border rounded-lg p-1 ${
          isMobile ? "w-full" : "w-full"
        }`}
      >
        <FiSearch className="ml-2 h-5 w-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author or ISBN"
          className={`w-full px-2 py-1 bg-white text-gray-700 placeholder-gray-500 outline-none ${
            isMobile ? "text-sm" : ""
          }`}
        />
        {!isMobile && (
          <button
            type="submit"
            className="bg-bilbao-700 text-white px-6 py-2 rounded-md hover:bg-bilbao-900 transition"
          >
            Search
          </button>
        )}
      </form>

      {/* Suggestions dropdown */}
      {searchResults.length > 0 && (
        <div className={`absolute left-0 right-0 bg-white shadow-lg z-50 mt-1 overflow-y-auto rounded-md border ${
          isMobile ? 'max-h-60' : 'max-h-72'
        }`}>
          {searchResults.map((book) => (
            <div
              key={`${book._id}-${isMobile ? 'mobile' : 'desktop'}`}
              onMouseDown={(e) => handleBookClick(e, book._id)}
              className={`flex items-center justify-between p-3 border-b last:border-b-0 cursor-pointer transition-colors duration-150 ${
                isMobile 
                  ? 'hover:bg-gray-50' 
                  : 'hover:bg-bilbao-50'
              }`}
            >
              {/* Book Info - Left Side */}
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {book.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {book.author}
                </p>
              </div>
              
              {/* Book Cover - Right Side */}
              <div className="flex-shrink-0">
                <img
                  src={book.cover.url}
                  alt={book.title}
                  className={`object-cover rounded ${
                    isMobile ? 'w-10 h-12' : 'w-12 h-16'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {searchLoading && (
        <div className="absolute left-0 right-0 bg-white shadow-lg z-50 mt-1 p-3 text-sm text-gray-500 rounded-md border">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bilbao-700 mr-2"></div>
            Searching...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
