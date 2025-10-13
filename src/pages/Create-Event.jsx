import NavBar from "../components/NavBar/NavBar";

function CreateEvent() {
  return (
    <>
      <NavBar />

      <form> 
        <div className="flex flex-col gap-4 p-5">
          <input
            type="text"
            placeholder="Event Title"
            className="ml-3 mt-2 text-2xl font-bold"
          ></input>
          <p className="ml-3 text-lg font-semibold">Activity Type: </p>
          <div className="flex gap-5 ml-3 text-lg">
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Walk"></input>
              Walk
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Run"></input>
              Run
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Climb"></input>
              Climb
            </label>
            <label className="flex gap-2">
              <input type="checkbox" name="Activities" value="Swim"></input>
              Swim
            </label>
          </div>

          <input
            type="datetime-local"
            placeholder="Date and Time"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></input>
          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></input>
          <input
            type="number"
            placeholder="Price"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></input>
          <input
            type="number"
            placeholder="Capacity"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></input>
          <textarea
            rows="4"
            placeholder="Description"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></textarea>
          <input
            type="url"
            placeholder="Image URL"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          ></input>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 text-lg transition"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateEvent;
