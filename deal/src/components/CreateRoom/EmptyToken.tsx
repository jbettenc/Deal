interface EmptyTokenProps {
  text?: string;
}

const EmptyToken = (props: EmptyTokenProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="absolute z-0 bg-gray-250 rounded-[10px] w-[130px] h-[130px] mr-[56px]" />
      <div className="absolute z-[1] w-[130px] h-[130px] ml-[56px] border-[3px] border-gray-220 border-dashed rounded-[10px] rotate-[15deg]" />
      <div className="z-10 text-gray-150 font-normal text-base">{props.text}</div>
    </div>
  );
};

export default EmptyToken;
