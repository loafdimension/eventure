import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { useAuth } from "../custom-hooks/useAuth";
import { supabase } from "../../supabaseClient";

function CreateEvent() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    location: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!session || !session.user) {
      setError("You must be logged in to create an event.");
      setLoading(false);
      return;
    }

    const newEvent = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      event_date: formData.event_date,
      created_by: session.user.id,
      price_type: formData.price > 0 ? "fixed" : "free",
      price: parseFloat(formData.price) || 0,
    };

    const { data, error } = await supabase.from("events").insert([newEvent]);

    setLoading(false);

    if (error) {
      console.error("Error inserting event:", error);
      setError("Failed to create event. Check console for details.");
    } else {
      console.log("Event created successfully:", data);
      alert("Event created successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <NavBar />
      <form className="ml-65 mr-65 mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-5">
          {error && <p className="text-red-500 font-bold">{error}</p>}

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 text-2xl font-bold"
            required
          />

          <p className="text-lg font-semibold">Activity Type: </p>
          <div className="flex gap-5 text-lg">
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Walk"></input>Walk
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Run"></input>Run
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Climb"></input>
              Climb
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Swim"></input>Swim
            </label>
          </div>

          <input
            type="datetime-local"
            name="event_date"
            placeholder="Date and Time"
            value={formData.event_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            min="0"
          />

          <input
            type="number"
            placeholder="Capacity"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />

          <input
            type="url"
            placeholder="Image URL"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />

          <button
            type="submit"
            disabled={loading} // Disable button while inserting data
            className="bg-[#FFDD00] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#EBBE0C] text-lg transition"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateEvent;
