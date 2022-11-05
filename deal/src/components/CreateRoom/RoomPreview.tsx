import EmptyContent from "./EmptyToken";

const EMPTY_TEXT = "No offer yet. Select NFTs that you want to swap.";

interface RoomPreviewProps {
  nfts: any[];
}

const RoomPreview = (props: RoomPreviewProps) => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold">My Offer</div>
      <div className="grow">
        {!props.nfts?.length && <EmptyContent text={EMPTY_TEXT} />}
        {props.nfts?.length > 0 && "Content"}
      </div>
    </div>
  );
};

export default RoomPreview;
