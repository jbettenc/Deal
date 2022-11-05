import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { setLoginType, setOpenLoginModal } from "../store/userSlice";
import Button from "./ui/Button";

function UserLinks() {
  const { account, deactivate } = useWeb3React();
  const dispatch = useDispatch();
  return (
    <>
      {!account ? (
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
      ) : (
        <Button
          style="tertiary"
          className="mt-auto py-3 px-6 w-full font-bold whitespace-nowrap"
          rounded={true}
          customFont={true}
          customSizing={true}
          onClick={() => {
            deactivate();
            dispatch(setLoginType(""));
          }}
        >
          Disconnect
        </Button>
      )}
    </>
  );
}

export default UserLinks;
