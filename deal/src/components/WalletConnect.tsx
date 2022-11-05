import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { WALLET_CONNECT, COINBASE, METAMASK, TORUS } from "../utils/web3/providers";

interface ProviderProps {
  name: string;
  logos: any;
  description: string | undefined;
  onClick: (e?: any) => void;
  [key: string]: any;
}

interface WallertSelectProps {
  handleLoginType: (e?: any) => void;
  onClose: (e?: any) => void;
  open: boolean;
  [key: string]: any;
}

const Provider = (props: ProviderProps) => {
  const { name, logos, description, onClick } = props;

  return (
    <>
      <div
        className={`bg-[#1f1f1f] w-full p-4 md:p-8 flex justify-between items-center rounded-xl cursor-pointer border border-gray-600 hover:border-gray-modal-border`}
        onClick={onClick}
      >
        <span className="text-left whitespace-nowrap">
          <span className="block text-heading2 text-white font-bold text-lg sm:text-[1.5rem] leading-none">{name}</span>
          <span className={`w-full text-xs sm:text-sm md:text-md mx-0 leading-none text-gray-modal-secondary`}>
            {description}
          </span>
        </span>
        <span className="flex flex-wrap items-center">
          {logos?.map((Logo: any, idx: number) => (
            <Logo
              key={`connect-logo-${idx}`}
              className="flex-shrink-0 mx-[5px] sm:mx-[10px] w-[20px] xs:w-[30px] md:w-[40px]"
            />
          ))}
        </span>
      </div>
    </>
  );
};

const Divider = () => {
  return (
    <div className="py-3 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
      <div className="h-px w-full bg-gray-300"></div>
      <span className="text-sm text-white">or continue with</span>
      <div className="h-px w-full bg-gray-300"></div>
    </div>
  );
};

const WalletSelect = (props: WallertSelectProps) => {
  const { handleLoginType, onClose, open } = props;
  const { activate, active } = useWeb3React();

  useEffect(() => {
    if (active) {
      if (onClose) {
        onClose();
      }
    }
  }, [active, onClose]);

  const providers = [METAMASK, WALLET_CONNECT, COINBASE, undefined, TORUS];

  return (
    <>
      <div
        className={`top-0 left-0 right-0 z-50 transition-opacity text-center fixed w-full h-full bg-gray-10 opacity-${
          open ? "100" : "0"
        } ${open ? "pointer-events-auto" : "pointer-events-none"} flex justify-center items-center box-border`}
        role="dialog"
      >
        <div
          className={`relative w-full h-full p-4 flex items-center justify-center ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-0"
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
          <div
            className={`overflow-auto max-h-full relative w-fit bg-gray-600 rounded-[1.25rem] m-3 p-6 md:px-14 md:py-16 ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }  overflow-auto md:w-[37.5rem] space-y-4 md:space-y-6`}
            onScroll={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {providers.map((provider) =>
              provider ? (
                <Provider
                  key={`${provider.id}-${provider.name}`}
                  name={provider.name}
                  logos={provider.logos}
                  description={provider.description}
                  onClick={() => {
                    activate(
                      provider.connector,
                      (e: Error) => {
                        if (e.message !== "Call init() first") {
                          // Torus error (does not need to be handled by us)
                          // TODO: add notification for error
                          // addNotify({
                          //   title: "Wallet Connection Error",
                          //   message: e.message,
                          //   type: "error"
                          // });
                        }
                      },
                      false
                    );
                    handleLoginType(provider.id);
                  }}
                />
              ) : (
                <Divider />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletSelect;
