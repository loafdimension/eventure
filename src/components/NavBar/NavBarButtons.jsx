import { Link } from "react-router-dom";

function NavBarButtons() {
  return (
    <nav className="w-full">
      <div className="flex flex-row items-center justify-between w-full px-10">
        <div className="flex flex-row gap-25 ml-25">
          <Link to="/create-event" className="hover:text-indigo-600 text-xl">
            Create Event
          </Link>
          <Link to="/my-events" className="hover:text-indigo-600 text-xl">
            My Events & Calendar
          </Link>
          <Link to="/" className="hover:text-indigo-600 text-xl">
            Find Event
          </Link>
        </div>

        <div className="flex flex-row gap-10">
          <Link
            to="/login"
            className="hover:text-indigo-600 font-semibold text-xl"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="hover:text-indigo-600 font-semibold text-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBarButtons;
