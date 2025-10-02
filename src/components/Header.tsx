import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="z-10 flex justify-between py-4 px-[5vw] bg-neutral-900/50 backdrop-blur-xl shadow-md sticky top-0">
      <Link to="/">
        <h1>Movie App</h1>
      </Link>
      <nav className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "hover:text-blue-300 transition duration-100"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="favorites"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "hover:text-blue-300 transition duration-150"
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
