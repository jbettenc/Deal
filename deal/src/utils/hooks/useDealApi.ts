import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

interface Offer {
  from: string;
  offerNonce: number;
  erc20Tokens: number[];
  erc20TokenAmounts: number[];
  erc721Tokens: number[];
  erc721TokenIds: number[];
  erc1155Tokens: number[];
  erc1155TokenIds: number[];
  erc1155TokenAmounts: number[];
}

interface ResponseObject {
  success: boolean;
  errorMsg?: string;
  data?: any;
}

const DEAL_CONTRACT_ADDRESS = "";
const deal_abi = { abi: "" };

export function useDealApi(): any {
  const { active, library } = useWeb3React();
  const [contract, handleContract] = useState<Contract>();
  const [instance, handleInstance] = useState<Contract>();

  // Create a contract (for read calls)
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-mainnet.alchemyapi.io/v2/xTrIufa8bBMhQmEc14yrjDOV0yKIka9r"
    );
    const dealContract = new ethers.Contract(DEAL_CONTRACT_ADDRESS, deal_abi.abi, provider);
    handleContract(dealContract);
  }, []);

  // Connect signer to Deal contract (for write calls)
  useEffect(() => {
    if (contract && active) {
      handleInstance(contract.connect(library.getSigner()));
    } else {
      handleInstance(undefined);
    }
  }, [contract, active, library]);

  const createOffer = (
    from: string,
    erc20Tokens: number[],
    erc20TokenAmounts: number[],
    erc721Tokens: number[],
    erc721TokenIds: number[],
    erc1155Tokens: number[],
    erc1155TokenIds: number[],
    erc1155TokenAmounts: number[]
  ) => {
    return {
      from,
      erc20Tokens,
      erc20TokenAmounts,
      erc721Tokens,
      erc721TokenIds,
      erc1155Tokens,
      erc1155TokenIds,
      erc1155TokenAmounts
    };
  };

  const createRoom = async (roomName: string, hostOffer: Offer, idealOffer: Offer): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .createRoom(roomId, hostOffer, idealOffer)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const closeRoom = async (roomName: string): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .closeRoom(roomId)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const joinRoom = async (roomName: string, offer: Offer): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .joinRoom(roomId, offer)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const exitRoom = async (roomName: string): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .exitRoom(roomId)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const updateOffer = async (roomName: string, newOffer: Offer): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .updateOffer(roomId, newOffer)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const swap = async (roomName: string, counterParty: string): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    await instance
      .swap(roomId, counterParty)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        ret = { success: false, errorMsg: err.message ? err.message : err };
      });

    return ret;
  };

  const getOffer = async (roomName: string, party: string): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const roomId = ethers.utils.hashMessage(roomName);
    const offer = await instance.getOffer(roomId, party).catch((err: any) => {
      ret = { success: false, errorMsg: err.message ? err.message : err };
    });

    if (offer) {
      ret = { success: true, errorMsg: "", data: offer };
    }

    return ret;
  };

  return {
    createOffer,
    createRoom,
    closeRoom,
    joinRoom,
    exitRoom,
    updateOffer,
    swap,
    getOffer
  };
}
