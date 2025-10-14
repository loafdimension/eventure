import { Link } from "react-router-dom";
import { useAuth } from "../../custom-hooks/useAuth";

function NavBarButtons({ onLoginClick }) {
  const { isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const handleScrollToEvents = () => {
    setTimeout(() => {
      const section = document.getElementById("events-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
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
          <Link
            to="/#events-section"
            onClick={handleScrollToEvents}
            className="hover:text-indigo-600 text-xl"
          >
            Find Event
          </Link>
        </div>

        <div className="flex flex-row">
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="hover:text-indigo-600 font-semibold text-xl"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signup-login"
              className="hover:text-indigo-600 font-semibold text-xl"
            >
              Sign Up / Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarButtons;
