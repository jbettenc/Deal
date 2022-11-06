import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/root";
import { useEagerConnect } from "./utils/hooks/useEagerConnect";
import { useInactiveListener } from "./utils/hooks/useInactiveListener";
import { ReactNotifications } from "react-notifications-component";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { setLoginType, setOpenLoginModal } from "./store/userSlice";
import WalletSelect from "./components/WalletConnect";
import LandingPage from "./pages/LandingPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import RoomPage from "./pages/RoomPage";
import NewRoomPage from "./pages/NewRoomPage";
import "react-notifications-component/dist/theme.css";
import MakeOfferPage from "./pages/MakeOfferPage";

function App() {
  const [activatingConnector, setActivatingConnector] = useState();

  const { connector, account } = useWeb3React();
  const { openLoginModal } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // handle logic to recognize the connector currently being activated
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  document.body.classList.add("bg-gray-600");

  return (
    <>
      <div className={`flex min-h-screen max-h-screen font-azo opacity-0 opacity-100 text-white items-stretch`}>
        <ReactNotifications />
        <div className="h-16">
          <Navbar />
        </div>
        <Routes>
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/room/:id" element={<RoomPage />} />
            <Route path="/offer/:id" element={<MakeOfferPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        </Routes>
      </div>
      <WalletSelect
        open={openLoginModal}
        handleLoginType={(providerType: string) => {
          dispatch(setLoginType(providerType));
        }}
        onClose={() => {
          if (!account) {
            dispatch(setLoginType(""));
          }
          dispatch(setOpenLoginModal(false));
        }}
      />
    </>
  );
}

export default App;
