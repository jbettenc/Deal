import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyOfferContent from "./MyOfferContent";
import LookingForContent from "./LookingForContent";
import { useDealApi } from "../../utils/hooks/useDealApi";
import { useWeb3React } from "@web3-react/core";
import { getNFTMetadata } from "../../utils/web3/queries";
import { copyStringToClipboard, storeNotif, stringEqualsIgnoreCase } from "../../utils/misc";

interface RoomContentProps {
  id: string;
}

const RoomContent = (props: RoomContentProps) => {
  const navigate = useNavigate();

  const [roomCreator, handleRoomCreator] = useState<any>();
  const [offer, handleOffer] = useState<any>();
  const [metadata, handleMetadata] = useState<string>();
  const [nftMetadata, handleNftMetadata] = useState<NFTMetadata[]>([]);
  const [idealOfferNftMetadata, handleIdealOfferNftMetadata] = useState<NFTMetadata[]>();

  const { getOffer, getRoomCreator, getRoom } = useDealApi();

  const { account } = useWeb3React();

  useEffect(() => {
    if (!account) {
      return;
    }

    setTimeout(async () => {
      const rc = await getRoomCreator(props.id);
      handleRoomCreator(rc);
    }, 100);
  }, [account]);

  useEffect(() => {
    if (!roomCreator) {
      return;
    }
    (async () => {
      handleMetadata(roomCreator.metadata);

      let offer = await getOffer(props.id, roomCreator.host);
      handleOffer(offer);

      if (!offer.success) {
        setTimeout(async () => {
          offer = await getOffer(props.id, roomCreator.host);
          parseOffer(offer);
        }, 500);
      } else {
        parseOffer(offer);
      }
    })();
  }, [roomCreator]);

  const onShareRoom = () => {
    copyStringToClipboard(window.location.href);
    storeNotif("Link Copied!", "", "info");
  };

  const onMakeAnOffer = () => {
    // TODO: make an offer
    navigate(`/offer/${props.id}`);
  };

  const parseOffer = async (offer: any) => {
    const nftObj = offer.data.erc721TokenIds.map((id: string, idx: number) => {
      return {
        contract_address: offer.data.erc721Tokens[idx],
        tokenId: id
      };
    });

    const nftmd = await getNFTMetadata(nftObj);
    handleNftMetadata(nftmd);

    {
      const offer2 = await getRoom(props.id);
      const nftObj2 = offer2.data.idealOffer.erc721TokenIds.map((id: string, idx: number) => {
        return {
          contract_address: offer2.data.idealOffer.erc721Tokens[idx],
          tokenId: id
        };
      });

      const nftmd2 = await getNFTMetadata(nftObj2);
      handleIdealOfferNftMetadata(nftmd2);
    }
  };

  const onBackToEdit = () => {
    // TODO: integrate api for edit
    const { id } = props;
    // onSetNFTs(RoomData.nfts);
    // onSetNotes(RoomData.note);
    // onSetTokens(RoomData.tokens);
    // onSetCollections(RoomData.collections);
    // TODO: go to Edit
    navigate("/create");
  };

  const cancleNew = () => {
    // TODO: integrate api for cancel
    navigate("/");
  };

  if (!roomCreator || !idealOfferNftMetadata) {
    return (
      <div className="h-screen w-full flex">
        <svg className="animate-spin w-8 h-8 m-auto fill-current shrink-0" viewBox="0 0 16 16">
          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-full flex flex-col pt-[8rem]">
        {/* <div className="w-full font-bold text-[36px] leading-[100px] text-center text-gray-22 px-[52px]">
          {props.isNew ? "Congratulations! You just proposed a deal!" : `Room #${props.id}`}
        </div> */}
        <div className="flex justify-center items-center w-full h-full max-h-[556px] mt-[24px] relative px-[52px]">
          <div className="absolute w-full h-full max-w-[876px] max-h-[556px] bg-gray-520 shadow-room rounded-[12px] -rotate-3 mr-[12px]" />
          <div className="z-[1] w-full h-full max-w-[876px] max-h-[556px] bg-gray-520 shadow-room rounded-[12px] border border-gray-25">
            <div className="w-full h-[304px] bg-gray-25 py-[24px] px-[44px] rounded-t-[12px]">
              <MyOfferContent nfts={nftMetadata} tokens={[]} />
            </div>
            <div className="w-full h-[252px] py-[24px] px-[44px] rounded-b-[12px]">
              <LookingForContent
                collections={idealOfferNftMetadata ? idealOfferNftMetadata : []}
                note={metadata ? metadata : ""}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="h-40 w-full bg-orange-450 absolute bottom-0 rounded-t-lg max-w-7xl mx-auto justify-center">
            <div className="z-10 relative w-full flex justify-center -mt-[2rem]">
              <button
                className="h-[64px] rounded-[8px] w-[362px] px-[32px] text-white font-medium text-[18px] leading-[24px] bg-indigo-500 shadow-button"
                onClick={stringEqualsIgnoreCase(roomCreator.host, account) ? onShareRoom : onMakeAnOffer}
              >
                {stringEqualsIgnoreCase(roomCreator.host, account) ? "Share it!" : "Make an offer"}
              </button>
            </div>
            {/* {stringEqualsIgnoreCase(roomCreator, account) && (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomContent;
