import UserLinks from "./UserLinks";
import Logo from "../assets/logo.svg";

function Navbar() {
  return (
    <div className="w-full absolute">
      <nav className="select-none w-full">
        <div id="nav" className="w-full flex flex-col lg:flex-row fixed z-10">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto">
            <div id="nav-top" className="bg-transparent w-full px-4 mt-4">
              <div className="flex flex-row">
                <div className="h-full flex mr-4">
                  <a href="#">
                    <img src={Logo} alt="BoltBolt" />
                  </a>
                </div>
                <div className="ml-auto">
                  <UserLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
