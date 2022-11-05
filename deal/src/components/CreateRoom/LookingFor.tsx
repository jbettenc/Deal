import EmptyContent from "./EmptyToken";
import NFTCard from "./Sidebar/NFTCard";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

interface LookingForProps {
  collections: any[];
}

const LookingFor = (props: LookingForProps) => {
  const renderCollections = (item: any, index: number) => {
    return (
      <div key={`collection-${item.id}-${index}`} className="mb-[12px] w-[122px] h-[144px] relative">
        <div className="absolute z-20 -rotate-[7deg] -ml-[8px] w-full h-full">
          <NFTCard nft={item.collections[0]} fullWidth fullHeight />
        </div>
        <div className="absolute z-10 rotate-[4deg] -mr-[10px] w-full h-full">
          <NFTCard nft={item.collections[0]} fullWidth fullHeight />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold">Looking For</div>
      <div className="grow">
        {!props.collections?.length && <EmptyContent text={EMPTY_TEXT} />}
        {props.collections?.length > 0 && (
          <div className="flex w-full overflow-x-hidden gap-[28px] mt-[40px] pl-[16px]">
            {props.collections.map(renderCollections)}
          </div>
        )}
      </div>
    </div>
  );
};

export default LookingFor;
