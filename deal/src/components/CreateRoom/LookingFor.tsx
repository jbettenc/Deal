import { useSelector } from "react-redux";
import { RootState } from "../../store/root";
import EmptyContent from "./EmptyToken";
import NFTCard from "./Sidebar/NFTCard";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

const LookingFor = () => {
  const { collections } = useSelector((state: RootState) => state.room);

  const renderCollections = (item: any, index: number) => {
    if (!item.selected) {
      return null;
    }
    return (
      <div key={`collection-${item.tokenId}-${index}`} className="mb-[12px] w-[110px] h-[144px] relative">
        <div className="absolute z-[2] -rotate-[7deg] -ml-[8px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight />
        </div>
        <div className="absolute z-[1] rotate-[4deg] -mr-[10px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold">Looking For</div>
      <div className="grow overflow-y-auto">
        {!collections || !collections.length ? <EmptyContent text={EMPTY_TEXT} /> : null}
        {collections.length > 0 ? (
          <div className="flex w-full overflow-x-hidden gap-[28px] mt-[40px] pl-[16px] flex-wrap">
            {collections.map(renderCollections)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LookingFor;
