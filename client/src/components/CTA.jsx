import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CTA = () => {
  return (
    <section className="bg-green-50 px-10 py-12 mx-6 md:mx-15 my-3.5 rounded-xl flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Left Text Content */}
      <div className="md:w-1/2 text-center md:text-left md:ml-18 mt-8 md:mt-0">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Welcome to our <span className="text-bilbao-700">Book Store</span>
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Find your next great read from our wide selection of books—delivered
          fast, securely, and tailored to your taste.
        </p>
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 border border-bilbao-700 text-bilbao-700 hover:bg-bilbao-700 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <FiArrowRight className="text-lg" />
          Explore
        </Link>
      </div>

      {/* Right Image */}

        <div className="md:w-1/2 relative flex justify-center items-center h-54 md:h-96">
            <img
            src="https://productimages.worldofbooks.com/1784756253.jpg"
            alt="Book 1"
            className="w-20 md:w-32 rounded shadow-md right-1/9 relative z-0 self-center"
            />

            <img
            src="https://productimages.worldofbooks.com/1444775812.jpg"
            alt="Book 2"
            className="w-28 md:w-48 rounded shadow-xl absolute z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
            />

            <img
            src="https://image-server.worldofbooks.com/images/9781405957618.jpg"
            alt="Book 3"
            className="w-20 md:w-32 rounded shadow-md left-1/9 relative z-0 self-center"
            />
        </div>
    </section>
  );
};

export default CTA;
