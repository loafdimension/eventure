import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";

function ActivityButtons() {
  return (
    <div className="flex gap-9 p-6">
      <FaWalking className="text-4xl" />
      <FaRunning className="text-4xl" />
      <GiMountainClimbing className="text-4xl" />
      <FaSwimmer className="text-4xl" />
    </div>
  );
}

export default ActivityButtons;
