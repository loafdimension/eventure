import NavBar from "../components/NavBar/NavBar";
import EventCalendar from "../components/My-Events/Events-Calendar";
import EventsRow from "../components/My-Events/Events-Row";

function MyEvents() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row p-10 gap-10">
        <div className="lg:w-2/4">
          <EventsRow />
        </div>
        <div className="lg:w-2/4">
          <EventCalendar />
        </div>
      </div>
    </>
  );
}

export default MyEvents;
