import { useState } from "react";
import { ArrowDownIcon } from "../../icons";

interface TokenInputProps {
  tokens: any[];
  data: any;
  index: number;
  onChange: (val: string, token: any, index: number) => void;
}

const TokenInput = (props: TokenInputProps) => {
  const [token, setToken] = useState<any>(props.data?.token || props.tokens[0]);
  const [price, setPrice] = useState<string>(props.data?.value || "");
  const [openTokens, setOpenTokens] = useState<boolean>(false);

  const handleSetToken = (data: any) => {
    setToken(data);
    setOpenTokens(false);
    if (price) {
      props.onChange(price, data, props.index);
    }
  };

  const handleChangeValue = () => {
    props.onChange(price, token, props.index);
  };

  return (
    <div className="w-full h-[58px] border border-gray-300 bg-gray-300 rounded-[16px] flex items-center">
      <input
        className="grow border-none outline-none shadow-none bg-transparent text-gray-22 text-base placeholder:text-gray-120 pl-[24px] pr-[24px]"
        placeholder="Enter Price: 0.00"
        value={price}
        onChange={(e: any) => setPrice(e.target.value)}
        onBlur={handleChangeValue}
      />
      <div className="h-full w-[130px] border-l-[3px] border-gray-400 relative">
        <div
          className="w-full h-full flex items-center justify-center gap-[8px] cursor-pointer"
          onClick={() => setOpenTokens(true)}
        >
          {token?.name}
          <ArrowDownIcon />
        </div>
        {openTokens && (
          <div
            className={`absolute z-[1] ${
              props.index > 2 ? "bottom-0" : "top-0"
            } right-0 left-0 divide-y divide-gray-400 bg-gray-300 border border-gray-400 rounded-[8px] h-[122px] overflow-hidden overflow-y-auto`}
          >
            {props.tokens?.map((item: any, index: number) => (
              <div
                key={`token-opt-${item.name}-${index}`}
                className="h-[40px] flex items-center justify-center cursor-pointer hover:bg-gray-200"
                onClick={() => handleSetToken(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInput;
