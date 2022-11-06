import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import NFTCard from "./NFTCard";
import { useDispatch } from "react-redux";
import { setNfts } from "../../../store/roomSlice";

interface NFTSidebarProps {
  loading: boolean;
  nfts: any[];
  data: any[];
  goToNext: () => void;
  onSetNFTs: (data?: any[]) => void;
}

const NFTSidebar = (props: NFTSidebarProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  const dispatch = useDispatch();

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
      const tmp = [...props.nfts];
      for (const idx of selected) {
        tmp[idx] = Object.assign({}, tmp[idx]);
        tmp[idx].selected = true;
      }
      dispatch(setNfts(tmp));
      // props.onSetNFTs(props.nfts.slice(0, selected.length));
      setSelected([]);
    }
  };

  const renderCards = (item: any, index: number) => {
    if (item.selected) {
      return null;
    }

    return (
      <div key={`${item.id}-${index}`} className="mb-[12px]">
        <NFTCard nft={item} active={selected.includes(index)} onClick={() => handleSelect(index)} />
      </div>
    );
  };

  if (props.loading) {
    return (
      <div className="flex h-full w-full">
        <div role="status" className="m-auto">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#999999"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#f8c110"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold mb-[24px] px-[32px] 8xl:px-[60px]">My NFTs</div>
      <div className="w-full px-[32px] 8xl:px-[60px]">
        <SearchInput />
      </div>
      <div className="grow w-full mt-[46px] nft-list-wrapper">
        <div className="w-full h-full overflow-hidden overflow-y-auto px-[32px] 9xl:px-[60px]">
          <div className="w-full flex flex-wrap justify-around 8xl:gap-[12px] 9xl:gap-[24px] overflow-auto">
            {props.nfts.map(renderCards)}
          </div>
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
