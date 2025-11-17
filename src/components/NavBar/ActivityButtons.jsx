import { FaWalking, FaRunning, FaSwimmer } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { useLocation } from "react-router-dom";

function ActivityButtons({ onHoverChange, onHoverLeave }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex gap-8 md:gap-12 p-2 md:p-4 justify-center ml-10 mr-50">
      <FaWalking
        className="text-3xl sm:text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/walking.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <FaRunning
        className="text-3xl sm:text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/running.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <GiMountainClimbing
        className="text-3xl sm:text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/climbing.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <FaSwimmer
        className="text-3xl sm:text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/swimming.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
    </div>
  );
}

export default ActivityButtons;
