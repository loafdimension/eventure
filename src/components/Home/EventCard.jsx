import { format } from "date-fns";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { useEvents } from "../../../context/EventsContext";
import { useAuth } from "../../custom-hooks/useAuth";
import { useState } from "react";
import { shareEvent } from "../../utils/shareEvent";
import ShareModal from "./ShareModal";

const DEFAULT_IMAGE_URL = "/images/event-card-default.jpg";

function EventCard({ event }) {
  const { removeEvent } = useEvents();
  const { userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const imageUrl = event.image_url || DEFAULT_IMAGE_URL;

  const handleDeleteEvent = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    setLoading(false);

    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete event.");
      return;
    }

    alert("Event deleted successfully!");
    removeEvent(event.id);
  };

  return (
    <div className="border-3 p-4 rounded-xl border-gray-400 relative hover:scale-105 transition-transform duration-200">
      {userRole === "admin" && (
        <button
          onClick={handleDeleteEvent}
          disabled={loading}
          className="absolute top-2 left-2 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      )}

      <Link to={`event/${event.id}`}>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              shareEvent(event, () => setIsShareModalOpen(true));
            }}
            className="border rounded-lg p-1 hover:bg-gray-100 transition"
          >
            Share
          </button>
        </div>

        {isShareModalOpen && (
          <ShareModal
            event={event}
            onClose={() => setIsShareModalOpen(false)}
          />
        )}
      </Link>
    </div>
  );
}

export default EventCard;
