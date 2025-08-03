import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookThunk";
import { fetchAllOrders } from "../features/customerOrders/OrdersThunk";
import { fetchAllUsers } from "../features/users/usersThunk";

const StatsCards = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { orders } = useSelector((state) => state.customerOrders);
  const { usersList } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAllOrders());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Calculate total revenue from orders
  const totalRevenue = () => {
    if (!orders || orders.length === 0) return 0;

    return orders.reduce((total, order) => {
      return total + (order.totalAmount || 0);
    }, 0);
  };

  const stats = [
    { label: "Total Books", value: books.length },
    { label: "Orders", value: orders.length },
    { label: "Customers", value: usersList.length },
    { label: "Revenue", value: totalRevenue().toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-2">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
