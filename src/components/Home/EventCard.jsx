import { format } from "date-fns";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { useEvents } from "../../../context/EventsContext";
import { useAuth } from "../../custom-hooks/useAuth";
import { useState, useEffect } from "react";
import { shareEvent } from "../../utils/shareEvent";
import ShareModal from "./ShareModal";
import { getActivityIcon } from "../../utils/getActivityIcon";
import { displayPrice } from "../../utils/displayPrice";

const DEFAULT_IMAGE_URL = "/images/event-card-default.jpg";

function EventCard({ event }) {
  const { removeEvent } = useEvents();
  const { userRole, session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const imageUrl = event.image_url || DEFAULT_IMAGE_URL;

  useEffect(() => {
    async function checkIfBooked() {
      if (!session) return;
      const { data, error } = await supabase
        .from("bookings")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("event_id", event.id)
        .maybeSingle();

      if (error) {
        console.error("Booking check error:", error);
        return;
      }

      if (data) setIsBooked(true);
    }

    checkIfBooked();
  }, [session, event.id]);

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

  const handleBookEvent = async () => {
    if (!session) {
      alert("You must be logged in to book an event!");
      return;
    }

    if (isBooked) {
      alert("✅ You’ve already booked this event.");
      return;
    }

    if (event.capacity === 0) {
      alert("❌ Event is fully booked!");
      return;
    }

    setBookingLoading(true);
    try {
      const { data: existingBooking } = await supabase
        .from("bookings")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("event_id", event.id);

      if (existingBooking && existingBooking.length > 0) {
        alert("✅ You’ve already booked this event.");
        setIsBooked(true);
        return;
      }

      const { error: bookingError } = await supabase
        .from("bookings")
        .insert([
          { user_id: session.user.id, event_id: event.id, status: "pending" },
        ]);

      if (bookingError) throw bookingError;

      const { data: updatedEvent, error: eventError } = await supabase
        .from("events")
        .update({ capacity: event.capacity - 1 })
        .eq("id", event.id)
        .select()
        .single();

      if (eventError) throw eventError;

      alert("🎉 Event successfully booked!");
      event.capacity = updatedEvent.capacity;
      setIsBooked(true);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to book the event.");
    } finally {
      setBookingLoading(false);
    }
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

      {userRole === "user" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleBookEvent();
          }}
          disabled={bookingLoading || event.capacity === 0 || isBooked}
          className={`absolute top-2 left-2 px-2 py-1 text-xs text-white rounded transition ${
            isBooked
              ? "bg-green-600 cursor-not-allowed"
              : bookingLoading
              ? "bg-gray-400"
              : event.capacity === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isBooked
            ? "Booked"
            : bookingLoading
            ? "Booking..."
            : event.capacity === 0
            ? "Full"
            : "Book Event"}
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
            <p className="border rounded-lg p-1">
              {event.capacity} places left!
            </p>
            <div className="border rounded-lg p-1 text-xl flex items-center justify-center">
              {getActivityIcon(event.activity_type)}
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <p>{event.title}</p>
          <p>{format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}</p>
          <p>{event.location}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="italic">
            {displayPrice(event.price_type, event.price)}
          </p>
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
