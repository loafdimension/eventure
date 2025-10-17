import NavBar from "../components/NavBar/NavBar";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../custom-hooks/useAuth";
import { addEventToGoogleCalendar } from "../utils/googleCalendar";
import { shareEvent } from "../utils/shareEvent";
import ShareModal from "../components/Home/ShareModal";
import { getActivityIcon } from "../utils/getActivityIcon";

const DEFAULT_IMAGE_URL = "/images/event-card-default.jpg";

function IndividualEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, userRole } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setEvent(data);
      setLoading(false);
    }

    async function checkBooking() {
      if (!session) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("event_id", id);

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        setBookingStatus("success");
      } else {
        setBookingStatus(null);
      }
    }

    fetchEvent();
    checkBooking();
  }, [id, session]);

  const handleBookEvent = async () => {
    if (!session) {
      alert("You must be logged in to book an event!");
      navigate("/signup-login");
      return;
    }

    setBookingStatus("loading");

    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert([{ user_id: session.user.id, event_id: id, status: "pending" }])
        .select();

      if (bookingError) throw bookingError;

      const { data: updatedEvent, error: eventError } = await supabase
        .from("events")
        .update({ capacity: event.capacity - 1 })
        .eq("id", id)
        .gt("capacity", 0)
        .select()
        .single();

      if (eventError) throw eventError;

      setEvent(updatedEvent);
      setBookingStatus("success");
      alert("🎉 Event successfully booked!");
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
      alert("❌ Failed to book the event.");
    }
  };

  const handleCancelBooking = async () => {
    if (!session) return;

    setBookingStatus("loading");

    try {
      // Get the user's booking for this event
      const { data: existingBookings, error: fetchError } = await supabase
        .from("bookings")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("event_id", id);

      if (fetchError) throw fetchError;

      if (!existingBookings || existingBookings.length === 0) {
        alert("No booking found.");
        setBookingStatus(null);
        return;
      }

      const bookingId = existingBookings[0].id;

      // Delete the booking
      const { error: deleteError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (deleteError) throw deleteError;

      // Safely increment the event capacity
      const { data: updatedEvent, error: eventError } = await supabase
        .from("events")
        .update({ capacity: event.capacity + 1 })
        .eq("id", id)
        .select()
        .single();

      if (eventError) throw eventError;

      setEvent(updatedEvent);
      setBookingStatus(null);
      alert("🚫 Booking cancelled successfully.");
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
      alert("❌ Failed to cancel booking.");
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
      console.error(err);
      alert("❌ Failed to delete event.");
    }
  };

  const handleAddToGoogleCalendar = async () => {
    if (!session) {
      alert("You must be logged in to add events to Google Calendar!");
      return;
    }

    const googleToken =
      session.provider_token || session.user?.app_metadata?.provider_token;

    if (!googleToken || !googleToken.access_token) {
      alert("Please connect your Google account first!");
      return;
    }

    try {
      const startTime = new Date(event.event_date).toISOString();
      const endTime = new Date(
        new Date(event.event_date).getTime() + 60 * 60 * 1000
      ).toISOString();

      await addEventToGoogleCalendar(googleToken.access_token, {
        title: event.title,
        description: event.description,
        startTime,
        endTime,
      });

      alert("✅ Event added to your Google Calendar!");
    } catch (err) {
      console.error("Error adding event to Google Calendar:", err);
      alert("❌ Failed to add event to Google Calendar");
    }
  };

  if (loading)
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-gray-500">Loading event...</div>
      </>
    );

  if (!event)
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-red-500">Event not found</div>
      </>
    );

  const imageUrl = event.image_url || DEFAULT_IMAGE_URL;

  const displayPrice = () => {
    switch (event.price_type) {
      case "free":
        return "Free";
      case "pay-as-you-feel":
        return "Pay What You Feel";
      case "fixed":
        return `£${Number(event.price).toFixed(2)}`;
      default:
        return "-";
    }
  };

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
            <p className="border rounded-lg p-1">
              {event.capacity} places left!
            </p>
            <div className="border rounded-lg p-1 text-2xl flex items-center justify-center">
              {getActivityIcon(event.activity_type)}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {bookingStatus === "success" ? (
              <>
                <button
                  onClick={() =>
                    shareEvent(event, () => setIsShareModalOpen(true))
                  }
                  className="border rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
                >
                  Share
                </button>

                <button
                  onClick={handleCancelBooking}
                  className="border rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>

                <button
                  onClick={handleAddToGoogleCalendar}
                  className="border rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Add to Google Calendar
                </button>
              </>
            ) : (
              <button
                onClick={handleBookEvent}
                disabled={bookingStatus === "loading" || event.capacity === 0}
                className={`border rounded-lg px-4 py-2 transition ${
                  bookingStatus === "loading" || event.capacity === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {event.capacity === 0
                  ? "Event Fully Booked"
                  : bookingStatus === "loading"
                  ? "Processing..."
                  : "Book Event"}
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
          <p className="italic">{displayPrice()}</p>
          <p>{event.description}</p>
          <p className="mt-5 font-bold">Date & Time</p>
          <p>{format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}</p>
          <p className="mt-5 font-bold">Location - {event.location}</p>
          <p>{event.location_description}</p>
          <p className="mt-20">
            <em>
              All payments are to be made in cash on the day of the event
              because our developer ran out of time to integrate online
              payments, but this seervice will be available soon!
            </em>
          </p>
        </div>
      </div>

      {isShareModalOpen && (
        <ShareModal event={event} onClose={() => setIsShareModalOpen(false)} />
      )}
    </>
  );
}

export default IndividualEvent;
