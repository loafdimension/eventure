import NavBar from "../components/NavBar/NavBar";
import { MdOutlineMail } from "react-icons/md";

function Contact() {
  const image = "images/default.jpg";

  return (
    <>
      <NavBar />
      <main className="pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row items-start px-4 sm:px-6 lg:px-10 py-8 sm:py-16 gap-8 sm:gap-10">
          <div className="flex flex-col items-center md:items-start flex-1">
            <div className="w-full max-w-4xl aspect-video relative mb-6 sm:mb-10">
              <img
                src={image}
                alt="Contact banner"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-center md:text-left">
                How can we help?
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed text-center md:text-left">
                We’re here to help! Whether you have questions about upcoming
                events, feedback, or partnership inquiries — feel free to reach
                out.
                <br />
                Email us and we’ll get right back to you.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 mt-4 justify-center md:justify-start">
                <MdOutlineMail className="text-2xl sm:text-3xl text-blue-600" />
                <p className="text-base sm:text-lg font-medium">
                  eventure-queries@eventure.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
            <div className="bg-white shadow-lg rounded-2xl w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 max-w-lg">
              <form className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
                />

                <textarea
                  rows="4"
                  placeholder="Your message..."
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 text-base sm:text-lg transition w-full sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
