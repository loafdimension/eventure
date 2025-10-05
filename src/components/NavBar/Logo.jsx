import { Link } from "react-router-dom";

function Logo() {
  return (
    <nav>
      <Link to="/" className="flex flex-col text-5xl font-bold p-5">
        eventure
      </Link>
    </nav>
  );
}

export default Logo;
