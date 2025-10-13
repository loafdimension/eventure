import EventRowCard from "./Event-Row-Card";
import { useEvents } from "../../../context/EventsContext";
import { Link } from "react-router";

function EventsRow({}) {
  const { events, loading } = useEvents();

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <p className="text-3xl font-bold ml-1">upcoming events</p>
      {events.map((event) => {
        return <EventRowCard key={event.id} event={event} />;
      })}
      <Link to="/">book more events</Link>
    </div>
  );
}

export default EventsRow;
