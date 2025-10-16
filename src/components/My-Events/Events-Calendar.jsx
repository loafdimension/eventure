import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enGB from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-GB": enGB };

const localiser = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function EventCalendar({ bookedEvents, hoverDate }) {

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#3b82f6", 
        color: "white",
        borderRadius: "4px",
        border: "none",
      },
    };
  };

  const dayPropGetter = (date) => {
    if (hoverDate && date.toDateString() === hoverDate.toDateString()) {
      return {
        style: { backgroundColor: "#fde68a" }, 
      };
    }
    return {};
  };

  return (
    <div className="flex justify-end mr-10 mt-5 rounded-xl">
      <Calendar
        localizer={localiser}
        startAccessor="start"
        endAccessor="end"
        events={bookedEvents}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        style={{ height: 600, width: 1000 }}
        className="text-sm lg:text-base"
      />
    </div>
  );
}

export default EventCalendar;
