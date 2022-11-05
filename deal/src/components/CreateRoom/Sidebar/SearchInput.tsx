import { SearchAltIcon } from "../../icons";

const SearchInput = () => {
  return (
    <div className="w-full h-[58px] border border-gray-300 bg-gray-300 rounded-[16px] relative pl-[68px] pr-[24px] flex items-center">
      <div className="absolute left-[28px]">
        <SearchAltIcon />
      </div>
      <input
        className="w-full border-none outline-none shadow-none bg-transparent text-gray-22 text-base placeholder:text-gray-120"
        placeholder="Search NFT Collection name, token ID"
      />
    </div>
  );
};

export default SearchInput;
