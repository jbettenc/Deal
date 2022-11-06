import React, { useState } from "react";
import { IStep } from "../../store/roomSlice";
import MyOffer from "./MyOffer";
import LookingFor from "./LookingFor";
import Sidebar from "./RoomSidebar";

interface CreateRoomProps {
  loading: boolean;
  step: IStep;
  nfts: any[];
  tokens: any[];
  collections: any[];
  note: string;
  goToNext: () => void;
  goToPrev: () => void;
  onSetNFTs: (data?: any[]) => void;
  onSetTokens: (data?: any[]) => void;
  onSetCollections: (data?: any[]) => void;
  onSetNotes: (data?: string) => void;
  onInitialize: () => void;
  onCreateRoom: (data?: any) => void;
}

const CreateRoom = (props: CreateRoomProps) => {
  const { step, nfts, tokens, collections, note, loading, ...restProps } = props;

  const renderStepContent = () => {
    switch (step) {
      case "my-nft":
      case "add-token":
        return <MyOffer nfts={nfts} tokens={tokens} />;
      case "add-collection":
        return <LookingFor />;
      default:
        return <></>;
    }
  };

  return (
    <div className="w-full relative">
      <div className="h-full px-[52px] py-[64px] mr-[400px] 8xl:mr-[540px] 9xl:mr-[594px]">
        <div className="flex justify-center items-center w-full h-full relative">
          <div className="absolute w-full h-full max-w-[876px] max-h-[556px] bg-orange-450 shadow-room rounded-[12px] -rotate-3 mr-[12px]" />
          <div className="z-[1] w-full h-full max-w-[876px] max-h-[556px] bg-gray-520 shadow-room rounded-[12px] border border-gray-25 px-[44px] py-[24px]">
            {renderStepContent()}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-[400px] 8xl:w-[540px] 9xl:w-[594px] bg-gray-550 z-10 py-4">
        <Sidebar {...restProps} loading={loading} step={step} notes={note} nfts={nfts} tokens={tokens} />
      </div>
    </div>
  );
};

export default CreateRoom;
