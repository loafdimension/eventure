import Logo from "./Logo";
import ActivityButtons from "./ActivityButtons";

function NavBar() {
  return (
    <div className="flex">
      <Logo />
      <ActivityButtons />
    </div>
  );
}

export default NavBar;
