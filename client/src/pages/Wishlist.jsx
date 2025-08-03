import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistThunk";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, isLoading, error } = useSelector((state) => state.wishlist);
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      dispatch(getWishlist());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemoveFromWishlist = (bookId) => {
    dispatch(removeFromWishlist(bookId));
  };

  return (
    <div className="px-7 md:px-14.5 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-bilbao-700 mb-8">My Wishlist</h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : !user || wishlist.length === 0 ? (
        <div className="px-4 md:px-15 py-6 md:py-10 min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-bilbao-700 mb-4">
              Your wishlist is empty
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Start adding your favorite books!
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="px-8 py-3 bg-bilbao-700 hover:bg-bilbao-800 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Browse Books
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((book, index) => (
            <div key={index} className="relative group">
              {/* BookCard with Link to Book */}
              <BookCard key={index} book={book} />

              {/* Remove from Wishlist button */}
              <button
                onClick={() => handleRemoveFromWishlist(book._id)}
                className="absolute top-6 left-3 bg-red-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remove from Wishlist"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
