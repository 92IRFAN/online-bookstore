import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard Overview";
      case "/books":
        return "Manage Books";
      case "/orders":
        return "Manage Orders";
      case "/customers":
        return "Customer Management";
      case "/add-book":
        return "Add New Book";
      default:
        if (location.pathname.startsWith("/edit-book/")) return "Edit Book";
        return "Dashboard Overview";
    }
  };

  return (
    <h1 className="text-2xl font-bold text-gray-800">
      {getTitle()}
    </h1>
  );
};

export default PageTitle;
