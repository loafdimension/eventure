import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and close icons
import Logo from "./Logo";
import ActivityButtons from "./ActivityButtons";
import NavBarButtons from "./NavBarButtons";

function NavBar({ onHoverChange, onHoverLeave }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Logo className="w-24 sm:w-32 h-auto" />
            <div className="hidden md:flex">
              <ActivityButtons
                onHoverChange={isHomePage ? onHoverChange : undefined}
                onHoverLeave={isHomePage ? onHoverLeave : undefined}
              />
            </div>
          </div>

          <div className="hidden md:flex gap-4">
            <NavBarButtons />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-start">
            <ActivityButtons
              onHoverChange={isHomePage ? onHoverChange : undefined}
              onHoverLeave={isHomePage ? onHoverLeave : undefined}
            />
            <NavBarButtons />
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
