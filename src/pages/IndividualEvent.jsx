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
  const { session } = useAuth();

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

    fetchEvent();
  }, [id]);

  const handleBookEvent = async () => {
    if (!session) {
      alert("You must be logged in to book an event!");
      navigate("/login");
      return;
    }

    if (bookingStatus === "loading") return;

    setBookingStatus("loading");

    const newBooking = {
      user_id: session.user.id,
      event_id: id,
      status: "pending",
    };

    const { error } = await supabase.from("bookings").insert([newBooking]);

    if (error) {
      console.error("Booking error:", error);
      setBookingStatus("error");
      alert(
        `Booking failed: ${error.message}. You might have already booked this event.`
      );
    } else {
      setBookingStatus("success");
      alert("🎉 Event successfully booked! Check your My Events page.");
      navigate("/my-events");
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

        <div className="w-full max-w-3xl flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <p className="border rounded-lg p-1">{event.capacity}</p>
            <p className="border rounded-lg p-1">{event.activity_type}</p>
          </div>

          <div className="flex gap-3 items-center">
            <p className="mr-20">weather icon</p>
            <div className="border rounded-xl p-2 flex flex-col items-center shadow-md bg-white/90">
              <p className="text-lg font-semibold mb-2">${event.price}</p>

              <button
                onClick={handleBookEvent}
                disabled={
                  bookingStatus === "loading" || bookingStatus === "success"
                }
                className={`border rounded-lg px-4 py-2 transition ${
                  bookingStatus === "loading"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : bookingStatus === "success"
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {bookingStatus === "loading"
                  ? "Processing..."
                  : bookingStatus === "success"
                  ? "Booked!"
                  : "Book Event"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p>{event.description}</p>
          <p className="mt-5 font-bold">Date & Time</p>
          <p> {format(new Date(event.event_date), "EEE, dd MMM yyy, HH:mm")}</p>
          <p className="mt-5 font-bold">Location - {event.location}</p>
          <p>{event.location_description}</p>
          <p className="mt-5 font-bold">Weather</p>
          <p>
            weather description, blah blah blah, sunshine oh wait no maybe cloud
            ph wait no maybe rain yes rain oh wait no tornado oh wait no thunder
            ohhhhh sunshine, its sunshine and rainbows
          </p>

          <button className="border rounded-lg p-1 self-end">share</button>
        </div>
      </div>
    </>
  );
}

export default IndividualEvent;
