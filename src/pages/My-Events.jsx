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

  useEffect(() => {
    async function fetchBookedEvents() {
      if (!session) return;

      const { data } = await supabase
        .from("bookings")
        .select(`events(*)`)
        .eq("user_id", session.user.id);

      if (data) {
        const formatted = data
          .map((b) => b.events)
          .filter(Boolean)
          .map((e) => ({
            id: e.id,
            title: e.title,
            start: new Date(e.event_date),
            end: new Date(new Date(e.event_date).getTime() + 60 * 60 * 1000), // default 1h
          }));

        setBookedEvents(formatted);
      }
    }

    fetchBookedEvents();
  }, [session]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row p-10">
        <div className="lg:w-2/4 flex flex-col items-center">
          <p className="text-3xl font-bold mb-4 w-full text-center">
            upcoming events
          </p>
          <EventsRow onHoverDate={setHoverDate} />
          <div className="mt-6 flex justify-center w-full">
            <BookMoreEvents />
          </div>
        </div>
        <div className="lg:w-2/4 mt-10 lg:mt-0">
          <EventCalendar bookedEvents={bookedEvents} hoverDate={hoverDate} />
        </div>
      </div>
    </>
  );
}

export default MyEvents;
