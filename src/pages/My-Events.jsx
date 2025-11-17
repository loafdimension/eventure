import { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import EventCalendar from "../components/My-Events/Events-Calendar";
import EventsRow from "../components/My-Events/Events-Row";
import BookMoreEvents from "../components/My-Events/BookMoreEvents";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../custom-hooks/useAuth";

function MyEvents() {
  const { session } = useAuth();
  const [bookedEvents, setBookedEvents] = useState([]);
  const [hoverDate, setHoverDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookedEvents() {
      if (!session) return;

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("bookings")
          .select(`events(*)`)
          .eq("user_id", session.user.id)
          .order("booked_at", { ascending: true });

        if (error) throw error;

        const formatted = data
          .map((b) => b.events)
          .filter(Boolean)
          .map((e) => ({
            id: e.id,
            title: e.title,
            start: new Date(e.event_date),
            end: new Date(new Date(e.event_date).getTime() + 60 * 60 * 1000),
            event_date: e.event_date,
            location: e.location,
            event_type: e.event_type,
            description: e.description,
          }));

        console.log("✅ MyEvents - formatted booked events:", formatted);
        setBookedEvents(formatted);
      } catch (err) {
        console.error("Error fetching booked events:", err);
        setError("Failed to load booked events. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookedEvents();
  }, [session]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 md:p-10">
        <div className="lg:w-2/4 flex flex-col items-center">
          <p className="text-2xl sm:text-3xl font-bold mb-4 w-full text-center">
            Upcoming Events
          </p>

          {loading ? (
            <p className="text-lg text-gray-600 text-center">
              Loading your events...
            </p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : bookedEvents.length === 0 ? (
            <p className="text-gray-600 text-center">No booked events yet.</p>
          ) : (
            <EventsRow onHoverDate={setHoverDate} events={bookedEvents} />
          )}

          <div className="mt-6 flex justify-center w-full">
            <BookMoreEvents />
          </div>
        </div>

        <div className="lg:w-2/4 w-full mt-6 lg:mt-0">
          <EventCalendar bookedEvents={bookedEvents} hoverDate={hoverDate} />
        </div>
      </div>
    </>
  );
}

export default MyEvents;
