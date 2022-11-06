import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IStep } from "../../store/roomSlice";
import EmptyContent from "./EmptyToken";
import { BackArrowIcon } from "../icons";
import NFTSidebar from "./Sidebar/NFTSidebar";
import TokenSidebar from "./Sidebar/TokenSidebar";
import CollectionSidebar from "./Sidebar/CollectionSidebar";
import UserMenu from "../UserMenu";
import { RootState } from "../../store/root";
import { useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { guidGenerator, storeNotif } from "../../utils/misc";
import { useDealApi } from "../../utils/hooks/useDealApi";
import { useWeb3React } from "@web3-react/core";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

interface RoomSidebarProps {
  loading: boolean;
  step: IStep;
  notes: string;
  nfts: NFTMetadata[];
  tokens: any[];
  goToNext: () => void;
  goToPrev: () => void;
  onSetNFTs: (data?: any[]) => void;
  onSetTokens: (data?: any[]) => void;
  onSetCollections: (data?: any[]) => void;
  onSetNotes: (data?: string) => void;
  onInitialize: () => void;
  onCreateRoom: (data?: any) => void;
  offer?: boolean;
  id?: string;
}

const RoomSidebar = (props: RoomSidebarProps) => {
  const [subMenuActive, handleSubMenuActive] = useState(false);

  const { ethAlias, ethAvatar } = useSelector((state: RootState) => state.user);
  const { collections } = useSelector((state: RootState) => state.room);

  const { createRoom, createOffer, joinRoom, getRoom } = useDealApi();
  const { account } = useWeb3React();

  const navigate = useNavigate();

  useEffect(() => {
    // fetch nfts and collections
    // setCollections([...COLLECTIONS_DATA, ...COLLECTIONS_DATA]);
  }, []);

  useEffect(() => {
    let eventListener: any = null;
    if (subMenuActive) {
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
    handleSubMenuActive(false);
  };

  const handleMakeRoom = async () => {
    if (!account) {
      return;
    }
    const { nfts, tokens, notes, onCreateRoom, onInitialize } = props;
    const roomName = guidGenerator();
    const id = ethers.utils.hashMessage(roomName);
    if (props.offer) {
      if (!props.id) {
        return;
      }

      const roomData: any = await getRoom(props.id);
      const { success, errorMsg, data } = await joinRoom(
        props.id,
        createOffer(
          roomData.data.nonce.toString(),
          account,
          [],
          [],
          nfts.filter((nft) => nft.selected).map((nft) => nft.contractAddress),
          nfts.filter((nft) => nft.selected).map((nft) => nft.tokenId),
          [],
          [],
          []
        )
      );
      if (success) {
        onCreateRoom({ nfts, tokens, collections, note: notes, id: id });
        setTimeout(() => {
          onInitialize();
          storeNotif("Swap Complete!", "You have successfully swapped NFTs!", "success");
          navigate(`/`);
        }, 0);
      } else {
        storeNotif("Error Swapping", errorMsg ? errorMsg : "", "danger");
        console.log(errorMsg);
      }
    } else {
      const { success, errorMsg, data } = await createRoom(
        roomName,
        createOffer(
          BigNumber.from(0),
          account,
          [],
          [],
          nfts.filter((nft) => nft.selected).map((nft) => nft.contractAddress),
          nfts.filter((nft) => nft.selected).map((nft) => nft.tokenId),
          [],
          [],
          []
        ),
        createOffer(
          BigNumber.from(0),
          account,
          [],
          [],
          collections.filter((nft) => nft.selected).map((nft) => nft.contractAddress),
          collections.filter((nft) => nft.selected).map((nft) => nft.tokenId),
          [],
          [],
          []
        ),
        notes
      );
      if (success) {
        onCreateRoom({ nfts, tokens, collections, note: notes, id: id });
        setTimeout(() => {
          onInitialize();
          navigate(`/room/${id}`);
        }, 0);
      } else {
        console.log(errorMsg);
      }
    }
  };

  const handleBack = () => {
    if (props.step !== "my-nft") {
      props.goToPrev();
    } else {
      props.onInitialize();
      navigate("/");
    }
  };

  const renderSidebar = () => {
    switch (props.step) {
      case "my-nft":
        return (
          <NFTSidebar
            loading={props.loading}
            nfts={props.nfts}
            data={props.nfts}
            goToNext={props.goToNext}
            onSetNFTs={props.onSetNFTs}
            offer={props.offer}
            id={props.id}
            onSubmit={handleMakeRoom}
          />
        );
      case "add-token":
        return (
          <TokenSidebar
            tokens={props.tokens}
            data={props.tokens}
            goToNext={props.goToNext}
            onSetTokens={props.onSetTokens}
          />
        );
      case "add-collection":
        return (
          <CollectionSidebar
            collections={collections}
            notes={props.notes}
            data={collections}
            onSetCollections={props.onSetCollections}
            onSetNotes={props.onSetNotes}
            onSubmit={handleMakeRoom}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="flex w-full h-full flex-col py-[54px] max-h-screen overflow-auto">
      <div className="flex flex-row w-full justify-between">
        <div
          className="text-gray-22 text-xl font-normal w-[80px] inline-flex items-baseline gap-[12px] cursor-pointer ml-[32px] 8xl:ml-[60px]"
          onClick={handleBack}
        >
          <BackArrowIcon />
          Back
        </div>
        <div className="ml-auto relative mr-8 z-40">
          <UserMenu
            showProfile={subMenuActive}
            handleShowProfile={(e: any, show: boolean) => {
              handleSubMenuActive(!subMenuActive);
            }}
            forceHandleShowProfile={(show: boolean) => {
              handleSubMenuActive(!subMenuActive);
            }}
            accountData={{ ethAlias: ethAlias, ethAvatar: ethAvatar }}
          />
        </div>
      </div>

      <div className="grow pt-[40px] h-full">{renderSidebar()}</div>
    </div>
  );
};

export default RoomSidebar;
