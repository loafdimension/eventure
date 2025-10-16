import { format } from "date-fns";
import { FaWalking, FaRunning, FaSwimmer } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../../custom-hooks/useAuth";
import { supabase } from "../../../supabaseClient";
import { useState } from "react";

function EventRowCard({ event, onEventDeleted }) {
  const { session, userRole } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = async () => {
    if (!session) return;
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);

    const { error } = await supabase.from("events").delete().eq("id", event.id);
    setLoading(false);

    if (error) {
      console.error("Delete event error:", error);
      alert("Failed to delete event. Please try again.");
      return;
    }

    alert("Event deleted successfully!");
    if (onEventDeleted) onEventDeleted(event.id); 
  };

  let eventType = event.event_type;
  if (event.event_type === "run") eventType = <FaRunning />;
  if (event.event_type === "walk") eventType = <FaWalking />;
  if (event.event_type === "swim") eventType = <FaSwimmer />;
  if (event.event_type === "climb") eventType = <GiMountainClimbing />;

  return (
    <div className="mr-10 mt-5">
      <Link
        to={`/event/${event.id}`}
        className="block hover:scale-105 transition-transform duration-200 border-3 p-3 rounded-xl border-gray-400"
      >
        <div className="grid grid-cols-3 grid-rows-3 p-2">
          <p className="col-start-1 row-start-1">{eventType}</p>
          <p className="col-start-3 row-start-1">
            {format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}
          </p>
          <p className="col-start-1 row-start-2 font-semibold">{event.title}</p>
          <p className="col-start-3 row-start-3 text-gray-700">{event.location}</p>
        </div>
      </Link>

      {userRole === "admin" && (
        <button
          onClick={handleDeleteEvent}
          disabled={loading}
          className="mt-2 border rounded-lg px-3 py-1 bg-red-600 text-white hover:bg-red-700 transition"
        >
          {loading ? "Deleting..." : "Delete Event"}
        </button>
      )}
    </div>
  );
}

export default EventRowCard;
