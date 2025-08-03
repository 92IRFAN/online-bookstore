import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validateImage from "../utils/validateImage";
import uploadToCloudinary from "../utils/cloudinaryUpload";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addBook, updateBook } from "../features/books/bookThunk";
import { resetAddBookState } from "../features/books/bookSlice";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const AddBook = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentCoverFile, setCurrentCoverFile] = useState(null);
  const fileInputRef = useRef();

  const { bookId } = useParams();
  const isEditMode = Boolean(bookId);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.books);

  // Fetch book if in edit mode
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${bookId}`);
        // Fill form
        setValue("title", data.title);
        setValue("author", data.author);
        setValue("isbn", data.isbn || "");
        setValue("description", data.description || "");
        setValue("price", data.price);
        setValue("stock", data.stock);
        setValue("category", data.category || "");
        setImagePreview(data.cover?.url || null); // Set existing image with null fallback
        setCurrentCoverFile(null); // No new file selected initially
      } catch (err) {
        toast.error("Failed to load book");
        console.error("Error fetching book:", err);
      }
    };

    if (isEditMode) {
      fetchBook();
    }
  }, [bookId, isEditMode, setValue]);

  // On Submit Form
  const onSubmit = async (data) => {
    // For edit mode, only require new image if no existing image preview
    // For add mode, always require an image
    if (!isEditMode && (!currentCoverFile)) {
      setError("cover", { message: "Cover image is required" });
      return;
    }

    setUploading(true);

    let coverData = null;

    // Only upload if there's a new file selected
    if (currentCoverFile) {
      const uploaded = await uploadToCloudinary(currentCoverFile);
      if (!uploaded) {
        setError("cover", { message: "Image upload failed" });
        setUploading(false);
        return;
      }
      coverData = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    const bookData = {
      title: data.title,
      author: data.author,
      isbn: data.isbn || "",
      description: data.description || "",
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      category: data.category || "General",
    };

    // Only include cover if we have new cover data
    if (coverData) {
      bookData.cover = coverData;
    }

    try {
      if (isEditMode) {
        await dispatch(updateBook({ id: bookId, bookData })).unwrap();
        toast.success("Book updated successfully!");
        navigate("/books")
      } else {
        await dispatch(addBook(bookData)).unwrap();
        toast.success("Book added successfully!");
        reset();
        setImagePreview(null);
        setCurrentCoverFile(null);
      }
    } catch (err) {
      const errorMessage = err?.message || err || "Something went wrong!";
      toast.error(errorMessage);
      console.error("Error saving book:", err);
    } finally {
      setUploading(false);
      dispatch(resetAddBookState());
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    clearErrors("cover"); // Clear any previous errors

    const validationResult = validateImage(file);

    if (validationResult === true) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentCoverFile(file);
      setValue("cover", file);
    } else {
      e.target.value = ""; // Clear the file input
      setError("cover", { message: validationResult });
      setCurrentCoverFile(null);
    }
  };

  const handleDiscardChanges = () => {
    reset();
    setImagePreview(null);
    setCurrentCoverFile(null);
    clearErrors();
  };

  return (
    <main className="flex-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="max-w-3xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...register("title", { 
                    required: "Title is required",
                    minLength: {
                      value: 1,
                      message: "Title must not be empty"
                    }
                  })}
                  className={`w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  {...register("author", { 
                    required: "Author is required",
                    minLength: {
                      value: 1,
                      message: "Author must not be empty"
                    }
                  })}
                  className={`w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500 ${
                    errors.author ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  ISBN
                </label>
                <input
                  {...register("isbn")}
                  className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500"
                  type="text"
                  placeholder="Enter ISBN (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500"
                  rows="4"
                  placeholder="Enter book description (optional)"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Cover Image {!isEditMode && "*"}
                </label>

                {!imagePreview ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="cover"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-bilbao-700 hover:text-bilbao-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-bilbao-500"
                        >
                          {uploading ? (
                            <span>Uploading...</span>
                          ) : (
                            <span className="font-bold">Upload a file</span>
                          )}
                          <input
                            id="cover"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG up to 2MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group mt-2 w-full flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Book cover preview"
                      className="w-40 h-52 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white text-bilbao-700 font-semibold rounded-md shadow hover:bg-bilbao-100 transition-colors"
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : "Change Image"}
                      </button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      disabled={uploading}
                    />
                  </div>
                )}

                {errors.cover && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.cover.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    {...register("price", { 
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0"
                      }
                    })}
                    className={`pl-7 w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                    step="0.01"
                    type="number"
                    min="0.01"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  {...register("stock", {
                    required: "Stock quantity is required",
                    min: {
                      value: 0,
                      message: "Stock cannot be negative"
                    }
                  })}
                  className={`w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500 ${
                    errors.stock ? "border-red-500" : ""
                  }`}
                  type="number"
                  min="0"
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-sm text-red-600 mt-1">{errors.stock.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-bilbao-500 focus:border-bilbao-500"
                >
                  <option value="">Select a category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Children">Children</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              className="px-6 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
              type="button"
              onClick={handleDiscardChanges}
              disabled={uploading || loading}
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={uploading || loading}
              className={`px-6 py-3 text-sm rounded-lg text-white transition-colors duration-200 ${
                uploading || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-bilbao-700 hover:bg-bilbao-900"
              }`}
            >
              {uploading 
                ? "Uploading..." 
                : loading 
                ? "Saving..." 
                : isEditMode 
                ? "Update Book" 
                : "Publish Book"
              }
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddBook;