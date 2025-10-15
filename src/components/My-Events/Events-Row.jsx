import { useEffect, useState } from "react";
import EventRowCard from "./Event-Row-Card";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../custom-hooks/useAuth";
import { Loader2 } from "lucide-react";

function EventsRow() {
  const { session } = useAuth();
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookedEvents() {
      if (!session || !session.user) {
        setLoading(false);
        setError("You must be logged in to view your booked events.");
        return;
      }

      setLoading(true);
      setError(null);
      const userId = session.user.id;

      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          events ( * ) // Select all columns from the linked 'events' table
        `
        )
        .eq("user_id", userId)
        .order("booked_at", { ascending: true });

      setLoading(false);

      if (error) {
        console.error("Error fetching booked events:", error);
        setError("Failed to load your events. Please try again.");
      } else {
        const eventsData = data
          .map((item) => item.events)
          .filter((e) => e !== null);
        setBookedEvents(eventsData);
      }
    }

    fetchBookedEvents();
  }, [session]);

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

  if (bookedEvents.length === 0) {
    return (
      <div>
        <div className="p-4 w-full">
          <p className="text-gray-600">
            You currently have no upcoming events booked.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {bookedEvents.map((event) => {
        return <EventRowCard key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventsRow;
