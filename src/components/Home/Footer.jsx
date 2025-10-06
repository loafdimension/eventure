import { Link } from "react-router-dom";
import Logo from "../NavBar/Logo";

function Footer() {
  return (
    <div className="flex flex-row justify-center items-center gap-25 p-4 bg-white shadow-md border-t border-gray-200">
      <Logo />
      <Link
        to="/contact"
        className="hover:text-indigo-600 font semibold text-2xl"
      >
        Contact
      </Link>
    </div>
  );
}

export default Footer;
