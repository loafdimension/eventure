import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
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
    location_description: "",
    price_type: "free",
    price: "",
    description: "",
    activity_type: "",
    capacity: "",
  });

  const [eventImage, setEventImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "event_image" && files && files.length > 0) {
      setEventImage(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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

    let finalImageUrl = null;
    if (eventImage) {
      const fileExt = eventImage.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("event_images")
        .upload(filePath, eventImage, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        setEventImage(null);
        setError("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("event_images")
        .getPublicUrl(filePath);
      finalImageUrl = urlData.publicUrl;
    }

    let dbPriceType = formData.price_type;
    if (formData.price_type === "pay-what-you-feel") {
      dbPriceType = "pay-as-you-feel";
    }

    const newEvent = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      location_description: formData.location_description,
      event_date: formData.event_date,
      created_by: session.user.id,
      price_type: dbPriceType,
      price: dbPriceType === "fixed" ? parseFloat(formData.price) || 0 : 0,
      activity_type: formData.activity_type,
      capacity: parseInt(formData.capacity, 10) || null,
      image_url: finalImageUrl,
    };

    const { data, error } = await supabase
      .from("events")
      .insert([newEvent])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error inserting event:", error);
      setError("Failed to create event. Check console for details.");
    } else {
      alert("Event created successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <NavBar />
      <main className="pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {error && (
            <div className="p-4 mb-6 rounded-xl shadow-md flex items-center gap-3 bg-red-100 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6"
          >
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-3xl font-bold p-3 border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500 rounded-md transition duration-150"
              required
            />

            {/* Activity Type */}
            <div>
              <p className="text-xl font-semibold text-gray-700 mb-3">
                Activity Type:
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {["Walk", "Run", "Climb", "Swim", "Other"].map((activity) => (
                  <label
                    key={activity}
                    className="flex items-center gap-2 cursor-pointer transition duration-150 ease-in-out hover:text-indigo-600"
                  >
                    <input
                      type="radio"
                      name="activity_type"
                      value={activity}
                      checked={formData.activity_type === activity}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      required
                    />
                    {activity}
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <label className="block">
              <span className="text-lg font-medium text-gray-700">
                Date & Time:
              </span>
              <input
                type="datetime-local"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
                required
              />
            </label>

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
              required
            />

            <textarea
              rows="3"
              name="location_description"
              placeholder="Location Description"
              value={formData.location_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
            />

            {/* Price Type */}
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-700 mb-2">
                Price Type:
              </p>
              <div className="flex gap-6">
                {["free", "pay-what-you-feel", "fixed"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="price_type"
                      value={type}
                      checked={formData.price_type === type}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      required
                    />
                    {type === "free"
                      ? "Free"
                      : type === "pay-what-you-feel"
                      ? "Pay What You Feel"
                      : "Fixed Amount"}
                  </label>
                ))}
              </div>
            </div>

            {formData.price_type === "fixed" && (
              <input
                type="number"
                name="price"
                placeholder="Enter price amount"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
                min="0"
                required
              />
            )}

            {/* Capacity */}
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
              min="1"
              required
            />

            {/* Description */}
            <textarea
              rows="4"
              name="description"
              placeholder="Detailed description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-lg transition"
            />

            {/* Event Image */}
            <label className="block">
              <span className="text-lg font-medium text-gray-700">
                Event Image (Optional):
              </span>
              <input
                type="file"
                name="event_image"
                accept="image/jpeg, image/png"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 text-lg transition"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 px-6 rounded-xl transition duration-300 text-xl ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-[#FFDD00] text-gray-800 hover:bg-[#EBBE0C] shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6 inline-block mr-2" />
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateEvent;
