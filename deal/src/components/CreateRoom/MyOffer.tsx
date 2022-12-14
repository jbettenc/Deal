import EmptyContent from "./EmptyToken";
import NFTCard from "./Sidebar/NFTCard";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

interface MyOfferProps {
  nfts: any[];
  tokens: any[];
}

const MyOffer = (props: MyOfferProps) => {
  const renderNFT = (item: any, index: number) => {
    if (!item.selected) {
      return null;
    }
    return (
      <div key={`nft-${item.id}-${index}`} className="mb-[12px]">
        <NFTCard nft={item} active onClick={() => {}} />
      </div>
    );
  };

  const renderToken = (item: any, index: number) => {
    return (
      <div key={`token-${item.id}-${index}`} className="mr-[32px] flex items-center gap-[8px]">
        <div className="w-[54px] h-[54px] rounded-[30px] overflow-hidden">
          <img
            src={item.token?.icon ? item.token.icon : ""}
            className="w-[48px] h-[48px] border-[3px] rounded-[30px] border-dashed border-white object-cover"
            alt={item.token?.name ? item.token.name : ""}
          />
        </div>
        <div className="text-white text-[24px] leading-[24px] font-medium">x {item.value}</div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col overflow-hidden">
      <div className="text-gray-22 text-2xl font-bold mb-4">My Offer</div>
      <div className="grow overflow-y-auto">
        {!props.nfts?.filter((nft) => (nft.selected ? true : false)).length && <EmptyContent text={EMPTY_TEXT} />}
        {props.nfts?.length > 0 && (
          <div className="h-full flex flex-wrap w-full gap-[24px]">{props.nfts.map(renderNFT)}</div>
        )}
        {/* {props.nfts?.length > 0 && props.tokens?.length > 0 && (
          <div className="flex w-full overflow-x-hidden mt-[40px]">{props.tokens.map(renderToken)}</div>
        )} */}
      </div>
    </div>
  );
};

export default MyOffer;
