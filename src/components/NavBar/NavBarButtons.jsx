import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../custom-hooks/useAuth";

function NavBarButtons() {
  const { isAuthenticated, signOut, userRole, loading } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleScrollToEvents = () => {
    setTimeout(() => {
      const section = document.getElementById("events-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading) {
    // return a loading spinner here later
    return <div className="p-4">Loading navigation...</div>;
  }

  return (
    <nav className="w-full">
      <div className="flex flex-row items-center justify-between w-full px-10">
        <div className="flex flex-row gap-25 ml-25">
          {isAuthenticated && userRole === "admin" && (
            <Link to="/create-event" className="hover:text-indigo-600 text-xl">
              Create Event
            </Link>
          )}

          {isAuthenticated && (
            <Link to="/my-events" className="hover:text-indigo-600 text-xl">
              My Events & Calendar
            </Link>
          )}

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
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarButtons;
