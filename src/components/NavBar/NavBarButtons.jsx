import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../custom-hooks/useAuth";

function NavBarButtons({ vertical = false, onLinkClick }) {
  const { isAuthenticated, signOut, userRole, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    if (onLinkClick) onLinkClick(); 
  };

  const handleScrollToEvents = () => {
    setTimeout(() => {
      const section = document.getElementById("events-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      if (onLinkClick) onLinkClick(); 
    }, 100);
  };

  if (loading) return <div className="p-2 text-center">Loading...</div>;

  return (
    <div
      className={`flex ${
        vertical ? "flex-col items-start gap-8" : "flex-row items-center gap-28"
      }`}
    >
      {isAuthenticated && userRole === "admin" && (
        <Link
          to="/create-event"
          className="hover:text-indigo-600 text-lg sm:text-xl"
          onClick={onLinkClick}
        >
          Create Event
        </Link>
      )}

      {isAuthenticated && (
        <Link
          to="/my-events"
          className="hover:text-indigo-600 text-lg sm:text-xl"
          onClick={onLinkClick}
        >
          My Events
        </Link>
      )}

      <Link
        to="/#events-section"
        onClick={handleScrollToEvents}
        className="hover:text-indigo-600 text-lg sm:text-xl"
      >
        Find Event
      </Link>

      {isAuthenticated ? (
        <button
          onClick={handleSignOut}
          className="hover:text-indigo-600 font-semibold text-lg sm:text-xl"
        >
          Sign Out
        </button>
      ) : (
        <Link
          to="/signup-login"
          className="hover:text-indigo-600 font-semibold text-lg sm:text-xl"
          onClick={onLinkClick}
        >
          Sign In
        </Link>
      )}
    </div>
  );
}

export default NavBarButtons;
