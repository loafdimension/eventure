import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";

function EventCard() {
  return (
    <div className="border-3 p-4 rounded-xl border-gray-400">
      <img
        src="../../../public/images/event-card-test.jpg"
        className="w-50 h-auto rounded-lg mb-2"
      ></img>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          <p className="border rounded-lg p-1">capacity</p>
          <p className="border rounded-lg p-1">type</p>
        </div>
        <p>weather</p>
      </div>
      <div className="flex flex-col mb-5">
        <p>title of event</p>
        <p>date of event</p>
        <p>location of event</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>price</p>
        <button className="border rounded-lg p-1">share</button>
      </div>
    </div>
  );
}

export default EventCard;
