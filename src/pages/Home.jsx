import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Home/Footer";
import EventList from "../components/Home/EventList";

function Home() {
  const [currentImage, setCurrentImage] = useState("/images/default.jpg");

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        onHoverChange={(img) => setCurrentImage(img)}
        onHoverLeave={() => setCurrentImage("/images/default.jpg")}
      />

      <main className="fflex-grow flex flex-col items-center bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 sm:py-10 pt-24 sm:pt-32">
        <div className="w-full max-w-4xl aspect-video relative mb-6 sm:mb-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Activity display"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        <div className="max-w-4xl mb-5" id="events-section">
          <h1 className="text-2xl sm:text-3xl font-bold mt-5 mb-5 text-center sm:text-left">
            events
          </h1>
        </div>
        <EventList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
