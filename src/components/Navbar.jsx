import { useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { handleSearchChange } = useContext(SearchContext);

  const handleInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  return (
    <div className="w-full bg-blue-700">
      <nav className="w-3/4 mx-auto flex justify-between items-center py-6">
        <Link to="/" className="text-white text-xl font-bold">
          E-Katalog
        </Link>
        <div class="relative max-w-56 w-1/2 md:w-full">
          <input
            class="w-full py-2 px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="search"
            placeholder="Search"
            onChange={handleInputChange}
          />
          <button class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-white border-r border-y border-gray-300  rounded-r-xl hover:bg-gray-200">
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
