function EventRowCard() {
  return (
    <div className="p-15">
      <div className="block hover:scale-105 transition-transform duration-200 border-3 p-4 rounded-xl border-gray-400">
        <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
          <p className="col-start-1 row-start-1">Event type</p>
          <p className="col-start-3 row-start-1">Event Date</p>
          <p className="col-start-1 row-start-2">Event Title</p>
          <p className="col-start-3 row-start-3">Event Location</p>
        </div>
      </div>
    </div>
  );
}

export default EventRowCard;
