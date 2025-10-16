import { format } from "date-fns";
import { FaWalking, FaRunning, FaSwimmer } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../../custom-hooks/useAuth";
import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { addEventToGoogleCalendar } from "../../utils/googleCalendar";

function EventRowCard({ event, booked = false, onEventDeleted, onHoverDate }) {
  const { session, userRole } = useAuth();
  const [loading, setLoading] = useState(false);

  const isBooked = booked || event.booked || false;

  const handleDeleteEvent = async () => {
    if (!session || !confirm("Are you sure you want to delete this event?"))
      return;

    setLoading(true);
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    setLoading(false);

    if (error) {
      alert("Failed to delete event. Please try again.");
      return;
    }

    if (onEventDeleted) onEventDeleted(event.id);
  };

  const handleAddToGoogleCalendar = async () => {
    if (!session) return;
    try {
      const startTime = new Date(event.event_date).toISOString();
      const endTime = new Date(
        new Date(event.event_date).getTime() + 60 * 60 * 1000
      ).toISOString();

      await addEventToGoogleCalendar(session.user.access_token, {
        title: event.title,
        description: event.description,
        startTime,
        endTime,
      });

      alert("✅ Event added to your Google Calendar!");
    } catch (err) {
      alert("❌ Failed to add event to Google Calendar");
    }
  };

  let eventType = event.event_type;
  if (event.event_type === "run") eventType = <FaRunning />;
  if (event.event_type === "walk") eventType = <FaWalking />;
  if (event.event_type === "swim") eventType = <FaSwimmer />;
  if (event.event_type === "climb") eventType = <GiMountainClimbing />;

  return (
    <div
      className="mr-10 mt-5"
      onMouseEnter={() =>
        onHoverDate && onHoverDate(new Date(event.event_date))
      }
      onMouseLeave={() => onHoverDate && onHoverDate(null)}
    >
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
          <p className="col-start-3 row-start-3 text-gray-700">
            {event.location}
          </p>
        </div>
      </Link>

      <div className="flex gap-2 mt-2">
        {userRole === "admin" && (
          <button
            onClick={handleDeleteEvent}
            disabled={loading}
            className="border rounded-lg px-3 py-1 bg-red-600 text-white hover:bg-red-700 transition"
          >
            {loading ? "Deleting..." : "Delete Event"}
          </button>
        )}
        {isBooked && (
          <button
            onClick={handleAddToGoogleCalendar}
            className="border rounded-lg px-3 py-1 bg-green-600 text-white hover:bg-green-700 transition"
          >
            Add to Google Calendar
          </button>
        )}
      </div>
    </div>
  );
}

export default EventRowCard;
