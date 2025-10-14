import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MyEvents from "./pages/My-Events";
import CreateEvent from "./pages/Create-Event";
import SignUp from "./pages/SignUp";
import IndividualEvent from "./pages/IndividualEvent";
import { EventsProvider } from "../context/EventsContext";

function App() {
  return (
    <EventsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/event/:id" element={<IndividualEvent />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/signup-login" element={<SignUp />} />
      </Routes>
    </EventsProvider>
  );
}

export default App;
