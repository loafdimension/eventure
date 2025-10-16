import NavBar from "../components/NavBar/NavBar";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../custom-hooks/useAuth";

const DEFAULT_IMAGE_URL = "/images/event-card-default.jpg";

function IndividualEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, userRole } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setEvent(data);
      }
      setLoading(false);
    }

    async function checkBooking() {
      if (!session) return;

      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("event_id", id)
        .single();

      if (data) setBookingStatus("success");
    }

    fetchEvent();
    checkBooking();
  }, [id, session]);

  const handleBookEvent = async () => {
    if (!session) {
      alert("You must be logged in to book an event!");
      navigate("/login");
      return;
    }

    setBookingStatus("loading");

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          user_id: session.user.id,
          event_id: id,
          status: "pending",
        },
      ]);

      if (error) throw error;

      alert("🎉 Event successfully booked!");
      setBookingStatus("success");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to book the event.");
      setBookingStatus("error");
    }
  };

  const handleCancelBooking = async () => {
    if (!session) return;

    setBookingStatus("loading");

    try {
      const { data: existingBookings, error } = await supabase
        .from("bookings")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("event_id", id);

      if (error) throw error;
      if (!existingBookings || existingBookings.length === 0) {
        alert("No booking found.");
        setBookingStatus(null);
        return;
      }

      const bookingId = existingBookings[0].id;

      const { error: deleteError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (deleteError) throw deleteError;

      alert("🚫 Booking cancelled successfully.");
      setBookingStatus(null);
    } catch (err) {
      console.error("Cancel booking error:", err);
      alert("❌ Failed to cancel booking.");
      setBookingStatus("error");
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;

      alert("Event deleted successfully.");
      navigate("/my-events");
    } catch (err) {
      console.error("Delete event error:", err);
      alert("❌ Failed to delete event.");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-gray-500">Loading event...</div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-red-500">Event not found</div>
      </>
    );
  }

  const imageUrl = event.image_url || DEFAULT_IMAGE_URL;

  return (
    <>
      <NavBar />
      <div className="p-10 flex flex-col items-center">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full max-w-3xl h-96 object-cover rounded-xl shadow-md mb-6"
        />

        <div className="w-full max-w-3xl flex justify-between items-center mb-4 gap-4">
          <div className="flex gap-2">
            <p className="border rounded-lg p-1">{event.capacity}</p>
            <p className="border rounded-lg p-1">{event.activity_type}</p>
          </div>

          <div className="flex gap-3 items-center">
            {bookingStatus === "success" ? (
              <button
                onClick={handleCancelBooking}
                className="border rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition"
              >
                Cancel Booking
              </button>
            ) : (
              <button
                onClick={handleBookEvent}
                disabled={bookingStatus === "loading"}
                className={`border rounded-lg px-4 py-2 transition ${
                  bookingStatus === "loading"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {bookingStatus === "loading" ? "Processing..." : "Book Event"}
              </button>
            )}

            {userRole === "admin" && (
              <button
                onClick={handleDeleteEvent}
                className="border rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete Event
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p>{event.description}</p>
          <p className="mt-5 font-bold">Date & Time</p>
          <p>{format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}</p>
          <p className="mt-5 font-bold">Location - {event.location}</p>
          <p>{event.location_description}</p>
        </div>
      </div>
    </>
  );
}

export default IndividualEvent;
