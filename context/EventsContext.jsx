import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events: ", error);
      } else {
        setEvents(data);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
