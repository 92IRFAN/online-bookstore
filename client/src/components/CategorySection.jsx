import CategoryCard from "./CategoryCard";

const categories = [
  {
    label: "Fiction",
    category: "fiction",
    image: "https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748431261/iybdbevoycutjyehhbqx.jpg",
  },
  {
    label: "Non-Fiction",
    category: "non-fiction",
    image: "https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748431570/b5ublbpa30afszmyxhfx.jpg",
  },
  {
    label: "Children",
    category: "children",
    image: "https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748429809/yofvuf3q8zez1ublgjwg.jpg",
  },
  {
    label: "Fantasy",
    category: "fantasy",
    image: "https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748432130/mbt9dwapfmwywi4gt4ay.jpg",
  },
  {
    label: "Thriller",
    category: "thriller",
    image: "https://res.cloudinary.com/dx1ybrxjc/image/upload/v1748432495/suyqloykdz7k3zpj2b9p.jpg",
  },
];

const CategorySection = () => {
  return (
    <section className="py-10 px-4 mt-4">
      <h1 className="text-[26px] font-bold text-center text-bilbao-700 mb-8 tracking-wider">
        Explore Categories
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
        {categories.map((cat, i) => (
          <CategoryCard
            key={i}
            image={cat.image}
            label={cat.label}
            category={cat.category}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
