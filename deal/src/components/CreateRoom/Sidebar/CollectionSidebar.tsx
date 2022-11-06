import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import NFTCard from "./NFTCard";
import { useDispatch } from "react-redux";
import { setCollections } from "../../../store/roomSlice";

interface CollectionSidebarProps {
  collections: any[];
  data: any[];
  notes: string;
  onSetCollections: (data?: any[]) => void;
  onSetNotes: (data?: string) => void;
  onSubmit: () => void;
}

const CollectionSidebar = (props: CollectionSidebarProps) => {
  const [loading, handleLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAddSelected = (collection: any, index: number) => {
    const tmp = [...props.collections];
    tmp[index] = Object.assign({}, tmp[index], { selected: true });
    dispatch(setCollections(tmp));
  };

  const handleSubmit = () => {
    if (loading) {
      return;
    }

    handleLoading(true);
    props.onSubmit();
  };

  const renderCards = (item: any, index: number) => {
    if (item.selected) {
      return null;
    }
    return (
      <div
        key={`${item.id}-${index}`}
        className="mb-[12px] w-[122px] h-[144px] relative"
        onClick={() => handleAddSelected(item, index)}
      >
        <div className="absolute z-20 -rotate-[7deg] -ml-[8px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight />
        </div>
        <div className="absolute z-10 rotate-[4deg] -mr-[10px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold mb-[24px] px-[32px] 8xl:px-[60px]">Add NFT</div>
      <div className="w-full px-[32px] 8xl:px-[60px]">
        <SearchInput />
      </div>
      <div className="grow w-full mt-[46px] collection-list-wrapper">
        <div className="w-full h-full overflow-hidden overflow-y-auto px-[32px] 9xl:px-[60px]">
          <div className="w-full flex flex-wrap justify-around pl-[20px] gap-[24px] 8xl:gap-[28px]">
            {props.collections.map(renderCards)}
          </div>
        </div>
      </div>
      <div className="mt-[24px] w-full px-[32px] 8xl:px-[60px]">
        <div className="w-full border border-gray-300 bg-gray-300 rounded-[12px] flex items-center">
          <textarea
            className="grow border-none outline-none shadow-none bg-transparent text-gray-22 text-base placeholder:text-gray-120 p-[24px]"
            rows={6}
            placeholder="Not looking for a specific collection? Type in your desired NFT description here instead."
            value={props.notes}
            onChange={(e: any) => props.onSetNotes(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-[24px] h-[64px] w-full flex justify-end items-center gap-[24px] px-[32px] 8xl:px-[60px]">
        <button
          className="h-[64px] rounded-[8px] px-[32px] bg-indigo-500 text-white font-semibold text-[18px] leading-[24px]"
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-8 h-8 fill-current shrink-0" viewBox="0 0 16 16">
                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </>
          ) : (
            "Make a Deal!"
          )}
        </button>
      </div>
    </div>
  );
};

export default CollectionSidebar;
