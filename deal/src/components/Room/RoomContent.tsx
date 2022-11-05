import React from "react";
import { useNavigate } from "react-router-dom";
import MyOfferContent from "./MyOfferContent";
import LookingForContent from "./LookingForContent";

interface RoomContentProps {
  RoomData: any;
  id?: string;
  isNew?: boolean;
  onSetNFTs: (data?: any[]) => void;
  onSetTokens: (data?: any[]) => void;
  onSetCollections: (data?: any[]) => void;
  onSetNotes: (data?: string) => void;
}

const RoomContent = (props: RoomContentProps) => {
  const navigate = useNavigate();

  const onShareRoom = () => {
    // TODO: share room!
    alert("Share new deal!");
  };

  const onMakeAnOffer = () => {
    // TODO: make an offer
    alert("Make an offer!");
  };

  const onBackToEdit = () => {
    // TODO: integrate api for edit
    const { RoomData, onSetNFTs, onSetCollections, onSetTokens, onSetNotes } = props;
    onSetNFTs(RoomData.nfts);
    onSetNotes(RoomData.note);
    onSetTokens(RoomData.tokens);
    onSetCollections(RoomData.collections);
    // TODO: go to Edit
    navigate("/create");
  };

  const cancleNew = () => {
    // TODO: integrate api for cancel
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="h-full flex flex-col pt-[64px]">
        <div className="w-full font-bold text-[36px] leading-[100px] text-center text-gray-22 px-[52px]">
          {props.isNew ? "Congratulations! You just proposed a deal!" : `Room #${props.id}`}
        </div>
        <div className="flex justify-center items-center w-full h-full max-h-[556px] mt-[24px] relative px-[52px]">
          <div className="absolute w-full h-full max-w-[876px] max-h-[556px] bg-gray-520 shadow-room rounded-[12px] -rotate-3 mr-[12px]" />
          <div className="z-10 w-full h-full max-w-[876px] max-h-[556px] bg-gray-520 shadow-room rounded-[12px] border border-gray-25">
            <div className="w-full h-[304px] bg-gray-25 py-[24px] px-[44px] rounded-t-[12px]">
              <MyOfferContent nfts={props.RoomData?.nfts || []} tokens={props.RoomData?.tokens || []} />
            </div>
            <div className="w-full h-[252px] py-[24px] px-[44px] rounded-b-[12px]">
              <LookingForContent collections={props.RoomData?.collections || []} note={props.RoomData?.note || ""} />
            </div>
          </div>
        </div>
        <div className="grow mt-[64px] w-full relative px-[52px]">
          <div className="absolute bg-orange-450 left-0 right-0 bottom-0 top-[20px]" />
          <div className="z-10 relative w-full flex justify-center">
            <button
              className="h-[64px] rounded-[8px] w-[362px] px-[32px] text-white font-medium text-[18px] leading-[24px] bg-indigo-500 shadow-button"
              onClick={props.isNew ? onShareRoom : onMakeAnOffer}
            >
              {props.isNew ? "Share it!" : "Make an offer"}
            </button>
          </div>
          {props.isNew && (
            <div className="z-10 relative w-full flex justify-center mt-[12px]">
              <div className="w-[362px] flex justify-between items-center">
                <button
                  className="rounded-[8px] w-[195px] text-gray-600 text-[18px] leading-[24px] h-[58px] bg-white px-[24px] font-medium shadow-button"
                  onClick={onBackToEdit}
                >
                  Back to Edit
                </button>
                <button
                  className="rounded-[8px] w-[141px] text-gray-600 text-[18px] leading-[24px] h-[58px] bg-white px-[24px] font-medium shadow-button"
                  onClick={cancleNew}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomContent;
