import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MyEvents from "./pages/My-Events";
import CreateEvent from "./pages/Create-Event";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import IndividualEvent from "./pages/IndividualEvent";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/my-events" element={<MyEvents />} />
      <Route path="/event/:id" element={<IndividualEvent />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
