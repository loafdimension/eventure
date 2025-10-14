import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import ActivityButtons from "./ActivityButtons";
import NavBarButtons from "./NavBarButtons";


function NavBar({ onHoverChange, onHoverLeave }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Logo />
        <ActivityButtons
          onHoverChange={isHomePage ? onHoverChange : undefined}
          onHoverLeave={isHomePage ? onHoverLeave : undefined}
        />
      </div>
      <NavBarButtons />
    </div>
  );
}

export default NavBar;
