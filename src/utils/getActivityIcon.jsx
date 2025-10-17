import { FaWalking, FaRunning, FaSwimmer } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";

export function getActivityIcon(activityType) {
  switch (activityType?.toLowerCase()) {
    case "walk":
      return <FaWalking className="text-xl" />;
    case "run":
      return <FaRunning className="text-xl" />;
    case "climb":
      return <GiMountainClimbing className="text-xl" />;
    case "swim":
      return <FaSwimmer className="text-xl" />;
    default:
      return null;
  }
}
