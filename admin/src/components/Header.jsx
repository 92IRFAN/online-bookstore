import { FiUser } from "react-icons/fi";
import PageTitle from "./PageTitle";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <PageTitle />
      <div className="flex items-center gap-3">
        <FiUser className="w-11 h-11 rounded-full bg-gray-100 p-3 text-black/70"/>
        <div className="font-medium dark:text-white">
          <div>Irfan</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            irfan@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
