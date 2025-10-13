import { format } from "date-fns";
import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";

function EventRowCard({ event }) {
  let eventType = event.event_type;

  if (event.event_type === "run") {
    eventType = <FaRunning />;
  }

  if (event.event_type === "walk") {
    eventType = <FaWalking />;
  }

  if (event.event_type === "swim") {
    eventType = <FaSwimmer />;
  }

  if (event.event_type === "climb") {
    eventType = <GiMountainClimbing />;
  }

  return (
    <div className="mr-10 mt-5">
      <div className="block hover:scale-105 transition-transform duration-200 border-3 p-3 rounded-xl border-gray-400">
        <div className="grid grid-cols-3 grid-rows-3 p-2">
          <p className="col-start-1 row-start-1">{eventType}</p>
          <p className="col-start-3 row-start-1">
            {format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}
          </p>
          <p className="col-start-1 row-start-2">{event.title}</p>
          <p className="col-start-3 row-start-3">{event.location}</p>
        </div>
      </div>
    </div>
  );
}

export default EventRowCard;
