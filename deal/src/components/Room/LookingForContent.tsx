import NFTCard from "../CreateRoom/Sidebar/NFTCard";

interface LookingForContentProps {
  collections: any[];
  note: string;
}

const LookingForContent = (props: LookingForContentProps) => {
  const renderCollections = (item: any, index: number) => {
    return (
      <div key={`collection-${item.id}-${index}`} className="mb-[12px] w-[102px] h-[124px] relative flex-shrink-0">
        <div className="absolute z-[2] -rotate-[7deg] -ml-[8px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight style={{ height: "74px" }} fontStyle={{ fontSize: "8px" }} />
        </div>
        <div className="absolute z-[2] rotate-[4deg] -mr-[10px] w-full h-full">
          <NFTCard nft={item} fullWidth fullHeight style={{ height: "74px" }} fontStyle={{ fontSize: "8px" }} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full text-gray-22 font-medium text-[24px] leading-[48px]">Looking For</div>
      <div className="w-full h-[144px] flex items-center gap-4 justify-between">
        <div className="grow w-[340px] flex items-center gap-[40px] overflow-x-auto pl-[16px]">
          {props.collections?.map(renderCollections)}
        </div>
        {props.note && props.note.length ? (
          <div className="bg-gray-600 rounded-[12px] w-[372px] h-[144px] overflow-hidden overflow-y-auto p-[18px] flex items-center">
            <div className="text-center text-gray-120 text-base font-normal w-full">{props.note}</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default LookingForContent;
