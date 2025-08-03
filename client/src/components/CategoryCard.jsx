import { useNavigate } from "react-router-dom";

const CategoryCard = ({ image, label, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection?category=${encodeURIComponent(category)}`);
  };

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="w-50 h-50 rounded-full bg-[#F8F8F8] overflow-hidden relative p-6 flex items-center justify-center">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="font-semibold text-center">{label}</p>
    </div>
  );
};

export default CategoryCard;
