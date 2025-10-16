import { useEffect, useState } from "react";
import EventRowCard from "./Event-Row-Card";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../custom-hooks/useAuth";
import { Loader2 } from "lucide-react";

function EventsRow({ setHoverDate }) {
  const { session, userRole } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!session || !session.user) {
        setLoading(false);
        setError("You must be logged in to view your events.");
        return;
      }

      setLoading(true);
      setError(null);

      const userId = session.user.id;
      let data, error;

      try {
        if (userRole === "admin") {
          const response = await supabase
            .from("events")
            .select("*")
            .eq("created_by", userId)
            .order("event_date", { ascending: true });

          data = response.data;
          error = response.error;
        } else {
          const response = await supabase
            .from("bookings")
            .select(`events (*)`)
            .eq("user_id", userId)
            .order("booked_at", { ascending: true });

          data = response.data?.map((item) => item.events).filter((e) => e !== null);
          error = response.error;
        }

        if (error) throw error;

        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load your events. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [session, userRole]);

  const handleEventDeleted = (deletedEventId) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== deletedEventId));
  };

  if (loading) {
    return (
      <p className="text-xl p-4 flex items-center">
        <Loader2 className="animate-spin w-5 h-5 mr-2" /> Loading your events...
      </p>
    );
  }

  if (error) {
    return <p className="text-xl p-4 text-red-600">Error: {error}</p>;
  }

  if (events.length === 0) {
    return (
      <div className="p-4 w-full">
        <p className="text-gray-600">
          {userRole === "admin"
            ? "You haven’t created any events yet."
            : "You currently have no upcoming events booked."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {events.map((event) => (
        <EventRowCard
          key={event.id}
          event={event}
          onEventDeleted={handleEventDeleted} 
          onHoverDate={setHoverDate}
        />
      ))}
    </div>
  );
}

export default EventsRow;
