const Discount = () => {
  return (
    <div className="px-6.5 md:px-15 mt-4">
      <section
        className="bg-cover rounded-lg bg-center bg-no-repeat py-20 px-6 sm:px-10 lg:px-20 text-center lg:text-left"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748945411/aiease_1748945248041_gi4dus.jpg')`,
        }}
      >
        <div className="flex items-center justify-center text-center">
          {/* Text Section */}
          <div className="text-gray-700 max-w-xl space-y-6">
            <p className="text-lg sm:text-xl font-medium">
              Shop wide range of collections
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] tracking-wide font-extrabold text-bilbao-700">
              BOOK FESTIVAL
            </h2>
            <p className="text-base sm:text-lg">
              ALL BOOKS ARE FLAT <span className="font-bold">50% OFF</span>
            </p>
            <button className="bg-bilbao-700 hover:bg-bilbao-900 text-white py-3 px-6 rounded shadow cursor-pointer transition-colors duration-200">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discount;
