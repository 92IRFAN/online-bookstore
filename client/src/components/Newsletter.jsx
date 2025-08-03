const Newsletter = () => {
  return (
    <section className="px-6 md:px-14 py-12">
      <div className="w-full mx-auto bg-[#F8F8F8] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Text Section */}
        <div className="text-center md:text-left">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Subscribe</p>
          <h2 className="text-xl md:text-3xl font-bold text-bilbao-700">Sign Up Our News Letter</h2>
          <p className="text-gray-600 text-sm mt-1">Join our mail list and get offers</p>
        </div>

        {/* Right Form Section */}
        <form className="w-full md:w-auto max-w-md flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your Email here"
            className="w-full px-6 py-3 rounded-full outline-none bg-white text-gray-700 focus:ring ring-bilbao-700 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-bilbao-700 hover:bg-bilbao-900 text-white px-6 py-3 rounded-full shadow-md transition duration-300 w-full sm:w-auto cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
