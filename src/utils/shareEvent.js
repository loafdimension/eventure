export async function shareEvent(event, openModal) {
  const eventUrl = `${window.location.origin}/event/${event.id}`;
  const shareData = {
    title: event.title,
    text: event.description || "Check out this event!",
    url: eventUrl,
  };

  try {
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      await navigator.share(shareData);
    } else {
      openModal();
    }
  } catch (err) {
    console.error("Error sharing event:", err);
    alert("❌ Failed to share the event.");
  }
}
