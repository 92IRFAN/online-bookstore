import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const BookCard = ({ book }) => {
  const [isAddedToBasket, setIsAddedToBasket] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToBasket = (e) => {
    e.preventDefault();

    const alreadyInCart = cartItems.some((item) => item._id === book._id);
    if (alreadyInCart) {
      toast.info("Item is already added to your cart");
      return;
    }

    if (book.stock === 0) return;

    dispatch(addToCart(book));
    setIsAddedToBasket(true);
    setTimeout(() => setIsAddedToBasket(false), 2000);
  };

  return (
    <Link
      to={`/book/${book._id}`}
      className="my-3 flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-xl duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 bg-white px-4 pt-4 cursor-pointer">
        <img
          alt={book.title}
          src={book.cover?.url}
          loading="lazy"
          className="h-full w-full object-contain"
        />
        {/* Stock Badges */}
        {book.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            OUT OF STOCK
          </div>
        )}
        {book.stock > 0 && book.stock < 20 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            LOW STOCK
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between px-5 pt-4 pb-5">
        <div>
          <h5 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
            {book.title}
          </h5>
          <p className="text-sm text-neutral-500 mb-2">{book.author}</p>
          <p className="mb-5">
            <span className="text-xl font-bold text-gray-800">
              ${book.price}
            </span>
          </p>
        </div>
        {/* Add to Basket Button */}
        <button
          onClick={handleAddToBasket}
          disabled={book.stock === 0}
          className={`mt-auto w-full flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-300
            ${
              book.stock === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-bilbao-700 text-white hover:bg-bilbao-900 focus:outline-none focus:ring-4 focus:ring-bilbao-600 cursor-pointer"
            }`}
        >
          {book.stock === 0
            ? "Out of Stock"
            : isAddedToBasket
            ? "✓ Added to Basket"
            : "Add To Basket"}
        </button>
      </div>
    </Link>
  );
};

export default BookCard;
