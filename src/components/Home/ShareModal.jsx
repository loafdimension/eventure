import { useEffect } from "react";
import { X } from "lucide-react";

function ShareModal({ event, onClose }) {
  const eventUrl = `${window.location.origin}/event/${event.id}`;

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      alert("📋 Link copied to clipboard!");
    } catch {
      alert("❌ Failed to copy link.");
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${event.title} ${eventUrl}`
      )}`,
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodeURIComponent(
        "Check out this event!"
      )}&body=${encodeURIComponent(`${event.title}\n\n${eventUrl}`)}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-80 shadow-xl flex flex-col gap-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold text-center">Share this event</h2>

        <div className="flex flex-col gap-3">
          {shareLinks.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-lg px-4 py-2 text-center hover:bg-gray-100 transition"
            >
              {name}
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="border rounded-lg px-4 py-2 text-center hover:bg-gray-100 transition"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
