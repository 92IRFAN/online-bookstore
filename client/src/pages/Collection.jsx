import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../features/books/bookThunk";
import { RiArrowDropDownLine } from "react-icons/ri";
import BookCard from "../components/BookCard";

const Collection = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const [searchParams] = useSearchParams();

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 25]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate min and max prices from products with fallback values
  const minPrice =
    books.length > 0 ? Math.min(...books.map((p) => p.price)) : 0;
  const maxPrice =
    books.length > 0 ? Math.max(...books.map((p) => p.price)) : 100;

  // Category mapping to handle URL parameters
  const categoryMapping = {
    "fiction": "Fiction",
    "non-fiction": "Non-Fiction",
    "children": "Children",
    "fantasy": "Fantasy",
    "thriller": "Thriller",
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleAvailability = (e) => {
    if (availability.includes(e.target.value)) {
      setAvailability((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setAvailability((prev) => [...prev, e.target.value]);
    }
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseFloat(e.target.value);
    setPriceRange(newRange);
  };

  // Search function to filter books by title, author, or ISBN
  const searchBooks = (books, query) => {
    if (!query.trim()) return books;

    const lowerQuery = query.toLowerCase();
    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        (book.isbn && book.isbn.toLowerCase().includes(lowerQuery))
      );
    });
  };

  const applyFilter = () => {
    let productsCopy = books.slice();

    // Apply search filter first
    if (searchQuery.trim()) {
      productsCopy = searchBooks(productsCopy, searchQuery);
    }

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by availability
    if (availability.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        if (availability.includes("in-stock") && item.stock > 0) return true;
        if (availability.includes("out-of-stock") && item.stock === 0)
          return true;
        return false;
      });
    }

    // Filter by price range
    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearFilters = () => {
    setCategory([]);
    setAvailability([]);
    setPriceRange([minPrice, maxPrice]);
  };

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");

    if (books.length > 0) {
      // Handle category parameter
      if (categoryFromUrl && categoryMapping[categoryFromUrl.toLowerCase()]) {
        const mappedCategory = categoryMapping[categoryFromUrl.toLowerCase()];
        setCategory([mappedCategory]);
      }

      // Handle search parameter
      if (searchFromUrl) {
        setSearchQuery(searchFromUrl);
      }
    }
  }, [books, searchParams]);

  useEffect(() => {
    applyFilter();
  }, [category, availability, priceRange, books, searchQuery]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Initialize with all products when books data loads
  useEffect(() => {
    if (books.length > 0) {
      setFilterProducts(books);
      // Only update price range if it hasn't been set by user
      if (priceRange[0] === 0 && priceRange[1] === 25) {
        setPriceRange([minPrice, maxPrice]);
      }
    }
  }, [books, minPrice, maxPrice]);

  // Get display title based on whether it's a search or regular collection view
  const getPageTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`;
    }
  };

  return (
    <div className="flex flex-col gap-1 py-10 px-7 md:px-15 sm:flex-row sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-1 md:mb-9 text-xl cursor-pointer sm:inline-block sm:cursor-default text-bilbao-700"
        >
          FILTERS
          <RiArrowDropDownLine
            className={`h-6 w-6 sm:hidden transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </p>

        <div className={`space-y-6 ${showFilter ? "" : "hidden"} sm:block`}>
          {/* Search Query Display */}

          {/* Category Filters */}
          <div className="border border-gray-300 pl-5 py-3 rounded">
            <p className="mb-3 text-sm font-medium text-bilbao-700">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="Fiction"
                  onChange={toggleCategory}
                  checked={category.includes("Fiction")}
                />
                Fiction
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="Non-Fiction"
                  onChange={toggleCategory}
                  checked={category.includes("Non-Fiction")}
                />
                Non-Fiction
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="Children"
                  onChange={toggleCategory}
                  checked={category.includes("Children")}
                />
                Children
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="Fantasy"
                  onChange={toggleCategory}
                  checked={category.includes("Fantasy")}
                />
                Fantasy
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="Thriller"
                  onChange={toggleCategory}
                  checked={category.includes("Thriller")}
                />
                Thriller
              </label>
            </div>
          </div>

          {/* Availability Filters */}
          <div className="border border-gray-300 pl-5 py-3 rounded">
            <p className="mb-3 text-sm font-medium text-bilbao-700">
              AVAILABILITY
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="in-stock"
                  onChange={toggleAvailability}
                  checked={availability.includes("in-stock")}
                />
                In Stock ({books.filter((p) => p.stock > 0).length})
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value="out-of-stock"
                  onChange={toggleAvailability}
                  checked={availability.includes("out-of-stock")}
                />
                Out of Stock ({books.filter((p) => p.stock === 0).length})
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border border-gray-300 pl-5 py-3 rounded">
            <p className="mb-3 text-sm font-medium text-bilbao-700">PRICE</p>
            <div className="space-y-4 w-96/100 md:w-50">
              <div className="flex gap-2 items-center text-sm">
                <span>$</span>
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <span>to</span>
                <span>$</span>
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                />
              </div>

              {/* Range Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="0.01"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="0.01"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div className="flex justify-between text-sm px-2 pt-5 text-gray-500">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          className={`px-4 py-2 mt-4 text-bilbao-700 border border-bilbao-700 rounded hover:bg-bilbao-900 hover:text-white transition-colors cursor-pointer ${
            showFilter ? "block" : "hidden"
          } sm:block`}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600">
              Showing {filterProducts.length} of {books.length} products
            </p>
          </div>

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 py-2 text-sm border-2 border-gray-300 rounded"
            value={sortType}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <BookCard key={index} book={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                {searchQuery.trim()
                  ? `No products found matching "${searchQuery}"`
                  : "No products found matching your filters."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
