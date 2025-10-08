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

      <main className="flex-grow flex flex-col items-center bg-gray-50 p-10">
        <div className="flex w-200 h-100 relative mb-10 justify-center">
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
        <div className="mb-5" id="events-section">
          <h1 className="text-3xl font-bold mt-5 mb-5">events</h1>
        </div>
        <EventList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
