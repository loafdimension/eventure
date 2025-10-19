import EventRowCard from "./Event-Row-Card";

function EventsRow({ events = [], onHoverDate }) {
  if (events.length === 0) {
    return (
      <div className="p-4 w-full">
        <p className="text-gray-600">
          You currently have no upcoming events booked.
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
          booked={true}
          onHoverDate={onHoverDate}
        />
      ))}
    </div>
  );
}

export default EventsRow;
