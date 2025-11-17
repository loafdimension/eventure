import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function ActivityButtons({ onHoverChange, onHoverLeave }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex gap-20 p-6 ml-15">
      <FaWalking
        className="text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/walking.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <FaRunning
        className="text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/running.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <GiMountainClimbing
        className="text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/climbing.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
      <FaSwimmer
        className="text-4xl hover:text-indigo-600 transition-colors"
        onMouseEnter={
          isHomePage ? () => onHoverChange("images/swimming.jpg") : undefined
        }
        onMouseLeave={isHomePage ? onHoverLeave : undefined}
      />
    </div>
  );
}

export default ActivityButtons;
