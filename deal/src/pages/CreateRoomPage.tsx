import { useEffect, useState } from "react";
import { getUserNFTs } from "../utils/web3/queries";

function CreateRoomPage() {
  const [userNfts, handleUserNfts] = useState<NFTMetadata[]>();
  useEffect(() => {
    (async () => {
      handleUserNfts(await getUserNFTs(""));
    })();
  }, []);
  return <>Create Room</>;
}

export default CreateRoomPage;
