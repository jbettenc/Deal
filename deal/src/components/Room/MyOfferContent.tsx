import NFTCard from "../CreateRoom/Sidebar/NFTCard";

interface MyOfferContentProps {
  nfts: any[];
  tokens: any[];
}

const MyOfferContent = (props: MyOfferContentProps) => {
  const renderNFTs = (item: any, index: number) => {
    return (
      <div
        key={`offer-nft-${item.id ? item.id : item.tokenId}-${index}`}
        className="absolute top-0"
        style={{
          left: `${index * 62}px`,
          zIndex: index + 1
        }}
      >
        <NFTCard nft={item} active />
      </div>
    );
  };
  const renderTokens = (item: any, index: number) => {
    return (
      <div
        key={`token-${item.token ? item.token.name : item.name}-${index}`}
        className="flex w-full justify-between items-center mb-[18px]"
      >
        <img
          src={item.token ? item.token.icon : item.image}
          className="w-[18px]"
          alt={item.token ? item.token.name : item.name}
        />
        <div className="text-white text-[16px] leading-[24px] font-bold">
          {item.value} {item.token.name}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full text-gray-22 font-medium text-[24px] leading-[48px]">My Offer</div>
      <div className="w-full h-[168px] flex items-center justify-between mt-[20px] overflow-auto">
        <div className="relative h-[164px]">{props.nfts?.map(renderNFTs)}</div>
        {/* <div className="bg-gray-600 rounded-[12px] w-[189px] h-[138px] overflow-hidden overflow-y-auto p-[18px] pb-0">
          {props.tokens?.map(renderTokens)}
        </div> */}
      </div>
    </>
  );
};

export default MyOfferContent;
