import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import NFTCard from "./NFTCard";

interface NFTSidebarProps {
  nfts: any[];
  data: any[];
  goToNext: () => void;
  onSetNFTs: (data?: any[]) => void;
}

const NFTSidebar = (props: NFTSidebarProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleSelect = (index: number) => {
    // TODO: check with id of nfts
    if (selected.includes(index)) {
      const newSelected = [...selected];
      newSelected.splice(selected.indexOf(index), 1);
      setSelected(newSelected);
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleAddSelected = () => {
    // TODO: update after integrating with real nfts
    if (selected.length) {
      props.onSetNFTs(props.nfts.slice(0, selected.length));
      setSelected([]);
    }
  };

  const renderCards = (item: any, index: number) => {
    return (
      <div key={`${item.id}-${index}`} className="mb-[12px]">
        <NFTCard nft={item} active={selected.includes(index)} onClick={() => handleSelect(index)} />
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold mb-[24px] px-[32px] 8xl:px-[60px]">My NFTs</div>
      <div className="w-full px-[32px] 8xl:px-[60px]">
        <SearchInput />
      </div>
      <div className="grow w-full mt-[46px] nft-list-wrapper">
        <div className="w-full h-full overflow-hidden overflow-y-auto px-[32px] 9xl:px-[60px]">
          <div className="w-full flex flex-wrap 8xl:gap-[12px] 9xl:gap-[24px]">{props.nfts.map(renderCards)}</div>
        </div>
      </div>
      <div className="mt-[24px] h-[64px] w-full flex justify-end items-center gap-[24px] px-[32px] 8xl:px-[60px]">
        {props.data?.length > 0 && (
          <button
            className="h-[64px] rounded-[8px] px-[32px] bg-orange-450 text-black font-semibold text-[18px] leading-[24px]"
            onClick={props.goToNext}
          >
            Next
          </button>
        )}
        <button
          className={`h-[64px] rounded-[8px] px-[32px] text-white font-semibold text-[18px] leading-[24px] ${
            selected.length > 0 ? "bg-indigo-500" : "bg-gray-24"
          }`}
          onClick={handleAddSelected}
        >
          Add Selected
        </button>
      </div>
    </div>
  );
};

export default NFTSidebar;
