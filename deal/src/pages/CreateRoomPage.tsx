import { useEffect, useState } from "react";
import { getUserNFTs } from "../utils/web3/queries";
import CreateRoom from "../components/CreateRoom";

function CreateRoomPage() {
  const [userNfts, handleUserNfts] = useState<NFTMetadata[]>();

  useEffect(() => {
    (async () => {
      handleUserNfts(await getUserNFTs(""));
    })();
  }, []);

  return (
    <>
      <CreateRoom />
    </>
  );
}

export default CreateRoomPage;
