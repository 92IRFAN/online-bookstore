import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchBooks, deleteBook } from "../features/books/bookThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const resultAction = await dispatch(deleteBook(bookId));
      if (deleteBook.fulfilled.match(resultAction)) {
        toast.success("Book deleted successfully!");
      } else {
        toast.error("Failed to delete book.");
      }
    }
  };

  return (
    <main className="flex-1">
      <div className="flex justify-end mb-8">
        <div className="flex items-center space-x-4">
          <input
            className="px-4 py-2 border border-black/30 rounded-lg focus:outline-none focus:ring-1"
            placeholder="Search books..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/add-book">
            <button className="w-full px-4 py-2.5 bg-bilbao-700 text-white text-sm rounded-lg hover:bg-bilbao-900 transition duration-200 cursor-pointer">
              + Add New Book
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Title</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">ISBN</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No matching books found.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr className="border-b" key={book._id}>
                    <td className="py-4">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>${book.price}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          book.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/edit-book/${book._id}`}
                        className="tooltip text-blue-500 hover:text-blue-700 mr-3 cursor-pointer"
                        data-tip="Edit"
                      >
                        <FiEdit className="inline-block text-lg" />
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="tooltip text-red-500 hover:text-red-700 cursor-pointer"
                        data-tip="Delete"
                      >
                        <AiOutlineDelete className="inline-block text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default Books;
