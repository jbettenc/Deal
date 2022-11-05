import UserLinks from "./UserLinks";
import Logo from "../assets/logo.svg";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/root";
import { useHeight } from "../utils/hooks/useHeight";
import { useSpring, config, animated } from "react-spring";

function Navbar() {
  const [subMenuActive, handleSubMenuActive] = useState(-1);
  const [showMobileNavbar, handleShowMobileNavbar] = useState(false);
  const location = useLocation();

  const { ethAlias, ethAvatar } = useSelector((state: RootState) => state.user);

  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.default },
    from: { height: 0 },
    to: {
      height: showMobileNavbar ? height : 0
    }
  });

  useEffect(() => {
    let eventListener: any = null;
    if (subMenuActive !== -1) {
      // @ts-ignore
      eventListener = hideMenu.bind(this);
      document.addEventListener("click", eventListener);
    }

    return () => {
      if (eventListener) {
        document.removeEventListener("click", eventListener);
      }
    };
  }, [subMenuActive]);

  const hideMenu = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const navbarComponents = document.getElementsByClassName("navbar-component");
      for (let i = 0; i < navbarComponents.length; i++) {
        if (navbarComponents[i].contains(event.target)) {
          return;
        }
      }
    }
    handleSubMenuActive(-1);
  };

  return (
    <div className="w-full absolute">
      <nav className="select-none w-full">
        <div id="nav" className="w-full flex flex-col lg:flex-row fixed z-10">
          <div className="w-full flex flex-col lg:flex-row mx-auto">
            <div id="nav-top" className="bg-transparent w-full px-4 lg:px-8 mt-12">
              <div className="flex flex-row">
                <div className="h-full flex mr-4">
                  <a href="#">
                    <img className="h-12" src={Logo} alt="BoltBolt" />
                  </a>
                </div>
                <div className="ml-auto">
                  <UserMenu
                    showProfile={subMenuActive === -2}
                    handleShowProfile={(e: any, show: boolean) => {
                      if (show && showMobileNavbar) {
                        handleShowMobileNavbar(false);
                      }
                      handleSubMenuActive(show ? -2 : -1);
                    }}
                    forceHandleShowProfile={(show: boolean) => {
                      if (subMenuActive !== -2 && showMobileNavbar) {
                        handleShowMobileNavbar(false);
                      }
                      handleSubMenuActive(show ? -2 : -1);
                    }}
                    accountData={{ ethAlias: ethAlias, ethAvatar: ethAvatar }}
                  />
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
