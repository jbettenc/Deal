import { useNavigate } from "react-router-dom";
import HomeImageOne from "../../assets/homeImg1.svg";
import HomeImageTwo from "../../assets/homeImg2.svg";
import { SearchIcon } from "../icons/SearchIcon";
import { StartIcon } from "../icons/StartIcon";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="font-nexa max-w-7xl mx-auto w-full pt-28 h-screen relative">
        <div className="flex items-center font-black leading-none bg-home-bg bg-no-repeat bg-center">
          <p className="text-7xl w-3/5 pl-3">
            Swap NFT for NFT Let&apos;s make a <br />
            <span className="text-orange-450">deal!</span>
          </p>
          <img src={HomeImageOne} className="w-2/5 pl-10" />
        </div>
        <div className="h-40 w-full bg-orange-450 absolute bottom-0 rounded-t-lg">
          <img src={HomeImageTwo} className="pl-10 -translate-y-2/3 absolute w-1/3" />
          <div className="h-32 rounded-full bg-white w-1/2 ml-auto mr-14 -translate-y-1/2 p-5 flex">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col">
                <div className="flex flex-col items-end leading-6 font-extrabold text-3xl text-gray-600">
                  <span className="bg-clip-text text-transparent from-white to-gray-40 bg-gradient-to-b">2</span>
                  <span className="">
                    21,00
                    <span className="bg-clip-text text-transparent from-gray-40 to-gray-24 bg-gradient-to-b">3</span>
                  </span>
                </div>
                <p className="leading-none font-medium text-xs opacity-80 text-gray-600 pb-4 pt-1">NFT Deals</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center border-r border-l px-8 border-gray-50">
              <div>
                <p className="text-gray-600 text-xl font-semibold leading-none whitespace-nowrap">
                  Want to find a deal?
                </p>
                <div className="flex items-center text-tiny mt-2">
                  <SearchIcon className="w-4 h-4 fill-orange-300" />
                  <p className="text-orange-300">Search Deals</p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center pl-4">
              <div
                className="w-full bg-blue-300 h-full w-full rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => {
                  navigate("/create", { replace: true });
                }}
              >
                <StartIcon className="w-5 mr-2" />
                Start A Deal
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
