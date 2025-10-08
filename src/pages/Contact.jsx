import NavBar from "../components/NavBar/NavBar";
import { MdOutlineMail } from "react-icons/md";

function Contact() {
  const image = "images/default.jpg";

  return (
    <>
      <NavBar />

      <div className="flex flex-col md:flex-row items-start px-10 py-16 gap-10">
        <div className="flex flex-col items-start flex-1">
          <div className="w-full max-w-3xl h-80 relative mb-10">
            <img
              src={image}
              alt="Contact banner"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold mb-6 text-center mt-20">
              How can we help?
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
              We’re here to help! Whether you have questions about upcoming
              events, feedback, or partnership inquiries — feel free to reach
              out.
              <br />
              Email us and we’ll get right back to you.
            </p>

            <div className="flex items-center gap-4 mt-4 justify-center">
              <MdOutlineMail className="text-3xl text-blue-600" />
              <p className="text-lg font-medium">
                eventure-queries@eventure.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center mt-30">
          <div className="bg-white shadow-lg rounded-2xl p-12 w-full max-w-lg">
            <form className="flex flex-col gap-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />

              <textarea
                rows="6"
                placeholder="Your message..."
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg resize-none"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 text-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
