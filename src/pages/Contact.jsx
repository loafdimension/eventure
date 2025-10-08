import NavBar from "../components/NavBar/NavBar";
import { MdOutlineMail } from "react-icons/md";

function Contact() {
  const image = "images/default.jpg";

  return (
    <>
      <NavBar />

      <div className="flex flex-col items-start px-10 py-16 relative">
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
            events, feedback, or partnership inquiries — feel free to reach out.
            <br />
            Email us and we’ll get right back to you.
          </p>

          <div className="flex items-center gap-4 mt-4 justify-center">
            <MdOutlineMail className="text-3xl text-blue-600" />
            <p className="text-lg font-medium">eventure-queries@eventure.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
