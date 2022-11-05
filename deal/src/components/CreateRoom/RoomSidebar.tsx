import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IStep } from "../../store/roomSlice";
import EmptyContent from "./EmptyToken";
import { BackArrowIcon } from "../icons";
import NFTSidebar from "./Sidebar/NFTSidebar";
import TokenSidebar from "./Sidebar/TokenSidebar";
import CollectionSidebar from "./Sidebar/CollectionSidebar";
import { MY_NFTS, COLLECTIONS_DATA, TOKEN_DATA } from "../../utils/servicies/mockData";
import UserMenu from "../UserMenu";
import { RootState } from "../../store/root";
import { useSelector } from "react-redux";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

interface RoomSidebarProps {
  step: IStep;
  notes: string;
  nfts: any[];
  collections: any[];
  tokens: any[];
  goToNext: () => void;
  goToPrev: () => void;
  onSetNFTs: (data?: any[]) => void;
  onSetTokens: (data?: any[]) => void;
  onSetCollections: (data?: any[]) => void;
  onSetNotes: (data?: string) => void;
  onInitialize: () => void;
  onCreateRoom: (data?: any) => void;
}

const RoomSidebar = (props: RoomSidebarProps) => {
  const [myTokens, setMyTokens] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [subMenuActive, handleSubMenuActive] = useState(false);

  const { ethAlias, ethAvatar } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch nfts and collections
    setMyTokens([...MY_NFTS, ...MY_NFTS]);
    setCollections([...COLLECTIONS_DATA, ...COLLECTIONS_DATA]);
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

  const handleMakeRoom = () => {
    const { nfts, tokens, collections, notes, onCreateRoom, onInitialize } = props;
    onCreateRoom({ nfts, tokens, collections, note: notes, id: "new" });
    setTimeout(() => {
      onInitialize();
      navigate("/create/new"); // TODO: open the room page instead of it
    }, 0);
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
        return <NFTSidebar nfts={myTokens} data={props.nfts} goToNext={props.goToNext} onSetNFTs={props.onSetNFTs} />;
      case "add-token":
        return (
          <TokenSidebar
            tokens={TOKEN_DATA}
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
            data={props.collections}
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
    <div className="flex w-full h-full flex-col py-[54px]">
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
