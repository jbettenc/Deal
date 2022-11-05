import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import Button from "./ui/Button";
import Identicon from "./common/IdentIcon";
import UserDisplay from "./UserDisplay";
import { ReactComponent as OpenWalletIcon } from "../assets/open_wallet.svg";
import { ReactComponent as DollarIcon } from "../assets/Dollar.svg";
import { ReactComponent as LogoutIcon } from "../assets/logout.svg";
import { setLoginType, setOpenLoginModal } from "../store/userSlice";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/root";

interface UserMenuProps {
  showProfile: boolean;
  handleShowProfile: (event: React.ChangeEvent<HTMLInputElement>, show: boolean) => void;
  forceHandleShowProfile: (show: boolean) => void;
  accountData: AccountData;
  [key: string]: any;
}

function UserMenu(props: UserMenuProps) {
  const { showProfile, handleShowProfile, forceHandleShowProfile, accountData } = props;

  const itemRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const web3Content = useWeb3React();
  const { account, deactivate } = web3Content;
  const connector: any = web3Content.connector;

  if (!account) {
    return (
      <>
        <Button
          style="tertiary"
          className="w-full font-bold py-3 px-6 whitespace-nowrap"
          rounded={true}
          customFont={true}
          customSizing={true}
          onClick={() => dispatch(setOpenLoginModal(true))}
        >
          Connect Wallet
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="flex sm:flex-1 justify-center select-none">
        <div className="ml-auto my-auto relative">
          <div id="account-button">
            <div
              className="identicon cursor-pointer border border-green-200 flex rounded-full focus:outline-none hover:border-white"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={(e: any) => {
                e.stopPropagation();
                handleShowProfile(e, !showProfile);
              }}
            >
              <span className="sr-only">Open user menu</span>
              {accountData?.ethAvatar ? (
                <img className="w-11 h-11 rounded-full object-cover" src={accountData.ethAvatar} alt="" />
              ) : (
                <div className="p-2">
                  <Identicon
                    string={account}
                    size={25}
                    palette={["#D7EEFF", "#eef2ff", "#991A1A", "#FFDECC", "#E98234", "#D98234", "#EE9F63", "#464648"]}
                  />
                </div>
              )}
            </div>
          </div>
          <CSSTransition
            in={showProfile}
            timeout={{ enter: 300, exit: 300 }}
            classNames="dropdownitem"
            unmountOnExit
            appear
            exit={true}
            nodeRef={itemRef}
            className="mt-2 navbar-component dropdownitem select-none bg-gray-600 border border-gray-400 rounded-md overflow-hidden absolute right-0"
          >
            <div
              ref={itemRef}
              id="account-dropdown"
              className={`z-40 ${
                showProfile ? "block" : "hidden"
              } text-white text-12 w-72 sm:text-15 sm:w-80 font-normal z-10 origin-top-right absolute right-0 mt-2 rounded-md shadow-xl pt-3 bg-gray-600 border border-gray-400 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <div className="px-4 flex items-center justify-start pb-3 w-max">
                <div className="identicon hover:bg-black cursor-pointer border mr-4 border-green-200 flex rounded-full">
                  {accountData?.ethAvatar ? (
                    <img className="w-9 h-9 rounded-full object-cover" src={accountData.ethAvatar} alt="" />
                  ) : (
                    <div className="p-2">
                      <Identicon
                        string={account}
                        size={17}
                        palette={[
                          "#D7EEFF",
                          "#eef2ff",
                          "#991A1A",
                          "#FFDECC",
                          "#E98234",
                          "#D98234",
                          "#EE9F63",
                          "#464648"
                        ]}
                      />
                    </div>
                  )}
                </div>
                <UserDisplay accountData={accountData} />
              </div>
              {!!connector?.torus && (
                <div className="flex justify-center my-4">
                  <div
                    className="flex cursor-pointer ml-auto mr-2 px-3 py-1 border border-gray-400 rounded-md bg-gray-600 hover:bg-gray-300 text-white text-10 block px-4"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                    onClick={() => {
                      connector.torus.showWallet("home");
                    }}
                  >
                    <div className="my-auto">
                      <OpenWalletIcon className="mr-2 fill-white" />
                    </div>
                    <div>Open Wallet</div>
                  </div>
                  <div
                    className="flex cursor-pointer mr-auto ml-2 px-3 py-1 rounded-md border border-gray-400 bg-gray-600 hover:bg-gray-300 text-white text-10 block px-4"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                    onClick={() => {
                      connector.torus.initiateTopup("moonpay", {
                        selectedAddress: account
                      });
                    }}
                  >
                    <div className="my-auto">
                      <DollarIcon className="mr-2 fill-white" />
                    </div>
                    <div>Deposit</div>
                  </div>
                </div>
              )}

              <div className="h-px bg-gray-400"></div>

              <div className="bg-black-23 rounded-b-md">
                <div
                  className={`justify-start px-6 flex cursor-pointer mx-auto py-4 bg-gray-600 rounded-b-md hover:bg-gray-300`}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={async (e: any) => {
                    e.preventDefault();
                    deactivate();
                    dispatch(setLoginType(""));
                    forceHandleShowProfile(false);
                  }}
                >
                  <div className="flex-col justify-start mr-4 my-auto">
                    <LogoutIcon className="fill-gray-45" />
                  </div>
                  <div className="text-gray-45">Log Out</div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
