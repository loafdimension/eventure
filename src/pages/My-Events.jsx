import NavBar from "../components/NavBar/NavBar";
import EventCalendar from "../components/My-Events/Events-Calendar";
import EventsRow from "../components/My-Events/Events-Row";
import BookMoreEvents from "../components/My-Events/BookMoreEvents";

function MyEvents() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row p-10">
        <div className="lg:w-2/4 flex flex-col items-center">
          <EventsRow />
          <div className="mt-6 flex justify-center">
            <BookMoreEvents />
          </div>
        </div>
        <div className="lg:w-2/4">
          <EventCalendar />
        </div>
      </div>
    </>
  );
}

export default MyEvents;
