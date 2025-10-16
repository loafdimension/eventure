export async function addEventToGoogleCalendar(accessToken, eventData) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: eventData.title,
          description: eventData.description,
          start: {
            dateTime: eventData.startTime,
            timeZone: "Europe/Berlin",
          },
          end: {
            dateTime: eventData.endTime,
            timeZone: "Europe/Berlin",
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to add event:", error);
      throw new Error(
        error.message || "Failed to add event to Google Calendar"
      );
    }

    const data = await response.json();
    console.log("Event created successfully:", data);
    return data;
  } catch (err) {
    console.error("Error adding event to Google Calendar:", err);
    throw err;
  }
}
