import EventCard from "./EventCard";
import { useEvents } from "../../../context/EventsContext";

function EventList() {
  const { events, loading } = useEvents();

  if (loading) return <p>Loading events...</p>;

  if (!events || events.length === 0)
    return <p className="text-gray-500">No events available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
