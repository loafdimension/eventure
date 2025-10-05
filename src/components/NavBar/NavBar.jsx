import Logo from "./Logo";
import ActivityButtons from "./ActivityButtons";
import NavBarButtons from "./NavBarButtons";

function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Logo />
        <ActivityButtons />
      </div>
      <NavBarButtons />
    </div>
  );
}

export default NavBar;
