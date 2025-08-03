import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingBasket, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RelatedBook from "../components/RelatedBook";
import { useEffect, useState } from "react";
import { fetchBookById } from "../features/books/bookThunk";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistThunk";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { book, loading, error } = useSelector((state) => state.books);
  const cartItems = useSelector((state) => state.cart.items);
  const { wishlist, isLoading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );
  const user = localStorage.getItem("token");

  const [isAddedToBasket, setIsAddedToBasket] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (bookId && (!book || book._id !== bookId)) {
      dispatch(fetchBookById(bookId));
    }
  }, [bookId]);

  // Load wishlist on component mount if user is logged in
  useEffect(() => {
    if (user && wishlist.length === 0) {
      dispatch(getWishlist());
    }
  }, [user, dispatch]);

  // Check if current book is in wishlist
  useEffect(() => {
    if (book && wishlist.length > 0) {
      setIsInWishlist(
        wishlist.some((wishlistBook) => wishlistBook._id === book._id)
      );
    }
  }, [book, wishlist]);

  const handleAddToBasket = () => {
    const alreadyInCart = cartItems.some((item) => item._id === book._id);
    if (alreadyInCart) {
      toast.info("Item is already added to your cart");
      return;
    }

    if (book.stock === 0) return;

    dispatch(addToCart(book));
    setIsAddedToBasket(true);
    setTimeout(() => setIsAddedToBasket(false), 2000);
    toast.success("Book added to cart!");
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.info("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(book._id))
        .unwrap()
        .then(() => {
          setIsInWishlist(false); // 👈 Update local state immediately
          toast.success("Book removed from wishlist!");
        })
        .catch((error) => {
          toast.error(error || "Failed to remove from wishlist");
        });
    } else {
      dispatch(addToWishlist(book._id))
        .unwrap()
        .then(() => {
          setIsInWishlist(true); // 👈 Update local state immediately
          toast.success("Book added to wishlist!");
        })
        .catch((error) => {
          toast.error(error || "Failed to add to wishlist");
        });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:px-15">
      {/* Flex layout: image, info, and sidebar */}
      <div className="flex flex-col sm:flex-row lg:flex-row gap-6 md:gap-8">
        {/* Book Image */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <img
            src={book.cover.url}
            alt={book.title}
            className="w-full max-w-[180px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[230px] h-auto rounded shadow-md object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1 space-y-4 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
            {book.title}
          </h1>
          <p className="text-lg sm:text-xl text-bilbao-700 font-medium">
            by{" "}
            <span className="underline decoration-bilbao-700 font-semibold">
              {book.author}
            </span>
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-700">
            ${book.price}
          </p>

          <p
            className={`text-sm font-semibold ${
              book.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            • {book.stock > 0 ? `${book.stock} In Stock` : "Out of Stock"}
          </p>

          {/* Add to Basket and Wishlist - Responsive buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-34">
            <button
              onClick={handleAddToBasket}
              disabled={book.stock === 0}
              className={`w-full sm:w-auto font-semibold px-6 py-3 sm:py-2 rounded flex items-center justify-center gap-2 transition-colors duration-200 ${
                book.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-bilbao-700 hover:bg-bilbao-900 text-white"
              }`}
            >
              <FaShoppingBasket />
              {book.stock === 0
                ? "Out of Stock"
                : isAddedToBasket
                ? "✓ Added to Basket"
                : "Add To Basket"}
            </button>

            <button
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              className={`w-full sm:w-auto flex items-center justify-center sm:justify-start text-xl py-2 sm:py-0 transition-colors duration-200 cursor-pointer font-semibold px-4 sm:px-2 rounded ${
                wishlistLoading
                  ? "opacity-50 cursor-not-allowed"
                  : isInWishlist && user
                  ? "text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100"
                  : "text-bilbao-700 hover:text-bilbao-900 bg-bilbao-50 hover:bg-bilbao-100"
              }`}
            >
              <FaHeart className={isInWishlist && user ? "text-red-600" : ""} />
              <span className="ml-2 text-sm sm:text-base">
                {wishlistLoading
                  ? "Loading..."
                  : isInWishlist && user
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </span>
            </button>
          </div>
        </div>

        {/* Info Panel - Hidden on mobile, visible from lg breakpoint */}
        <div className="w-full lg:w-1/4 lg:flex-shrink-0">
          <div className="p-4 md:p-6 rounded border border-gray-200 space-y-3">
            <h2 className="font-semibold text-lg text-bilbao-700">
              The feel-good place to buy books
            </h2>
            <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
              <li>Free delivery on orders over $5</li>
              <li>Get a free book when you join +Plus</li>
              <li>100% recyclable packaging</li>
              <li>Proud to be a B Corp</li>
              <li>Buy-back with World of Books</li>
            </ul>
            <button
              onClick={() => navigate("/collection")}
              className="w-full bg-bilbao-700 hover:bg-bilbao-900 text-white py-3 px-3 rounded text-sm mt-4 font-medium transition-colors duration-200"
            >
              Buy 3 Get 1 Free on Preloved Books under $12
            </button>
          </div>
        </div>
      </div>

      {/* Book Summary */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-bilbao-800 mb-3">
          {book.title} Summary
        </h2>
        <p className="font-semibold text-gray-800 mb-3">
          {book.title} by {book.author}
        </p>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {book.description}
        </p>
      </div>

      {/* Related Books */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-[26px] font-bold text-center text-bilbao-700 mb-8 tracking-wider">
          Related Books
        </h2>
        <RelatedBook category={book.category} currentBookId={book._id} />
      </div>
    </section>
  );
};

export default BookDetails;
