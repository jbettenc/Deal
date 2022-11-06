import { useEffect, useState } from "react";
import { getCollections, getUserNFTs, getUserTokens } from "../utils/web3/queries";
import CreateRoom from "../components/CreateRoom";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { setCollections, setNfts, setTokens } from "../store/roomSlice";

function CreateRoomPage() {
  const [queryRunning, handleQueryRunning] = useState(false);

  const { account } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account || queryRunning) {
      return;
    }

    handleQueryRunning(true);
    (async () => {
      dispatch(setNfts(await getUserNFTs("0x2B7F0615979eddDeAF83BFEC23F66fb5a6D177A4")));
      dispatch(setTokens(await getUserTokens("0x2B7F0615979eddDeAF83BFEC23F66fb5a6D177A4")));
      dispatch(setCollections(await getCollections()));
      handleQueryRunning(false);
    })();
  }, [account]);

  return (
    <>
      <CreateRoom loading={queryRunning} />
    </>
  );
}

export default CreateRoomPage;
