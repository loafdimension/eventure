import { format } from "date-fns";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE_URL = "/images/event-card-default.jpg";

function EventCard({ event }) {
  const imageUrl = event.image_url || DEFAULT_IMAGE_URL;

  return (
    <Link
      to={`event/${event.id}`}
      className="block hover:scale-105 transition-transform duration-200"
    >
      <div className="border-3 p-4 rounded-xl border-gray-400">
        <div className="w-full h-48 overflow-hidden rounded-lg mb-2">
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
            <p className="border rounded-lg p-1">{event.capacity}</p>
            <p className="border rounded-lg p-1">{event.activity_type}</p>
          </div>
          <p>weather</p>
        </div>
        <div className="flex flex-col mb-5">
          <p>{event.title}</p>
          <p>{format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}</p>
          <p>{event.location}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>${event.price}</p>
          <button className="border rounded-lg p-1">share</button>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
