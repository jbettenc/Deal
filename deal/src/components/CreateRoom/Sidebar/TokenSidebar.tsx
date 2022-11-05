import { useState } from "react";
import SearchInput from "./SearchInput";
import NFTCard from "./NFTCard";
import TokenInput from "./TokenInput";

interface TokenSidebarProps {
  tokens: any[];
  data: any[];
  goToNext: () => void;
  onSetTokens: (data?: any[]) => void;
}

const TokenSidebar = (props: TokenSidebarProps) => {
  const [selected, setSelected] = useState<any[]>([{ id: Date.now(), isNew: true }]);

  const handleSelected = (val: string, token: any, index: number) => {
    const selectedToken = { ...selected[index] };
    const updatedSelected = [...selected];
    updatedSelected[index] = { id: Date.now(), value: val, token, isNew: false };
    if (selectedToken.isNew) {
      updatedSelected.push([{ isNew: true }]);
      setSelected(updatedSelected);
    }
    setSelected(updatedSelected);
  };

  const handleAddSelected = () => {
    // TODO: update after integrating with real nfts
    const filteredTokens = selected.filter((item: any) => !item.isNew && item.value);
    if (filteredTokens.length) {
      props.onSetTokens(filteredTokens);
      setSelected([{ id: Date.now(), isNew: true }]);
    }
  };

  const renderTokenInput = (item: any, index: number) => {
    return (
      <div key={`item-token-${item.id}-${index}`} className="mb-[32px]">
        <TokenInput tokens={props.tokens} data={item} index={index} onChange={handleSelected} />
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="text-gray-22 text-2xl font-bold px-[32px] 8xl:px-[60px]">Add Token</div>
      <div className="grow w-full mt-[46px] nft-list-wrapper">
        <div className="w-full h-full overflow-hidden overflow-y-auto px-[32px] 8xl:px-[60px]">
          <div className="w-full">{selected.map(renderTokenInput)}</div>
        </div>
      </div>
      <div className="mt-[24px] h-[64px] w-full flex justify-end items-center gap-[24px] px-[32px] 8xl:px-[60px]">
        {props.data?.length > 0 && (
          <button
            className="h-[64px] rounded-[8px] px-[32px] bg-orange-450 text-black font-bold text-[18px] leading-[24px]"
            onClick={props.goToNext}
          >
            Next
          </button>
        )}
        {!props.data?.length && (
          <button className="text-orange-450 font-bold text-[18px] leading-[24px]" onClick={props.goToNext}>
            Skip
          </button>
        )}
        <button
          className={`h-[64px] rounded-[8px] px-[32px] text-white font-semibold text-[18px] leading-[24px] ${
            selected.length - 1 > 0 ? "bg-indigo-500" : "bg-gray-24"
          }`}
          onClick={handleAddSelected}
        >
          Add Tokens
        </button>
      </div>
    </div>
  );
};

export default TokenSidebar;
