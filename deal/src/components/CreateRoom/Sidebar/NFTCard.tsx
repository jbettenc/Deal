import NFTPreview from "../../../assets/nftpreview.svg";

interface NFTCardProps {
  nft: any;
  style?: any;
  fontStyle?: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const NFTCard = (props: NFTCardProps) => {
  const { nft, active, fullWidth, fullHeight, onClick } = props;

  return (
    <div
      className={`${fullWidth ? "w-full" : "w-[136px]"} ${fullHeight ? "h-full" : "h-[162px]"} ${
        active ? "border-2 border-orange-450" : "border-0"
      } p-[12px] rounded-[10px] bg-gray-600 cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      <div className="w-full h-[89px] rounded-[8px]" style={props.style}>
        <img
          src={nft.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = NFTPreview;
          }}
          className="w-full h-full rounded-[8px] object-contain"
          alt={nft.name}
        />
      </div>
      <div className="mt-[9px] text-[10px] leading-[10px] text-white font-normal" style={props.fontStyle}>
        {nft.name}
      </div>
      <div className="mt-[4px] text-[8px] leading-[8px] text-white font-light break-words">#{nft.tokenId}</div>
    </div>
  );
};

export default NFTCard;
