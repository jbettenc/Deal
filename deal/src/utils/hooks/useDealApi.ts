import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import deal_abi from "../../abi/Deal.json";

interface Offer {
  from: string;
  offerNonce: BigNumber;
  erc20Tokens: string[];
  erc20TokenAmounts: string[];
  erc721Tokens: string[];
  erc721TokenIds: string[];
  erc1155Tokens: string[];
  erc1155TokenIds: string[];
  erc1155TokenAmounts: string[];
}

interface ResponseObject {
  success: boolean;
  errorMsg?: string;
  data?: any;
}

const DEAL_CONTRACT_ADDRESS = "0x3020e9ed18a873da5dd3a9c8f14d92d6c4802bd0";

export function useDealApi() {
  const { active, library } = useWeb3React();
  const [contract, handleContract] = useState<Contract>();
  const [instance, handleInstance] = useState<Contract>();

  // Create a contract (for read calls)
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/59e38e7a0505462d810e0ac606665fd1"
      // "https://eth-mainnet.alchemyapi.io/v2/xTrIufa8bBMhQmEc14yrjDOV0yKIka9r" // mainnet
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
    offerNonce: BigNumber,
    from: string,
    erc20Tokens: string[],
    erc20TokenAmounts: string[],
    erc721Tokens: string[],
    erc721TokenIds: string[],
    erc1155Tokens: string[],
    erc1155TokenIds: string[],
    erc1155TokenAmounts: string[]
  ) => {
    return {
      offerNonce,
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

  const createRoom = async (
    roomName: string,
    hostOffer: Offer,
    idealOffer: Offer,
    metadata: string
  ): Promise<ResponseObject> => {
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
      .createRoom(roomId, hostOffer, idealOffer, metadata)
      .then(async (tx: any) => {
        await tx.wait(1).then(() => {
          ret = { success: true, errorMsg: "" };
        });
      })
      .catch((err: any) => {
        console.log(err);
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

  const joinRoom = async (roomId: string, offer: Offer): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

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

  const swap = async (roomId: string, counterParty: string): Promise<ResponseObject> => {
    if (!instance) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

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

  const getOffer = async (roomId: string, party: string): Promise<ResponseObject> => {
    if (!contract) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const offer = await contract.getOffer(roomId, party).catch((err: any) => {
      ret = { success: false, errorMsg: err.message ? err.message : err };
    });

    if (offer) {
      ret = { success: true, errorMsg: "", data: offer };
    }

    return ret;
  };

  const getRoomCreator = async (id: string) => {
    const url = "https://api.studio.thegraph.com/query/33336/deal-goerli/v0.0.3";

    const graphQlQuery = `{
      room(id: "${id}") {
        host
        metadata
        nonce
      }
    }`;

    let ret: any = "";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: graphQlQuery
      })
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result?.data) {
          ret = result.data.room;
        }
      });

    return ret;
  };

  const getRoom = async (roomId: string) => {
    if (!contract) {
      return {
        success: false,
        errorMsg: "Please refresh your page and connect your wallet."
      };
    }

    let ret: ResponseObject = {
      success: false
    };

    const offer = await contract.rooms(roomId).catch((err: any) => {
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
    getOffer,
    getRoomCreator,
    getRoom
  };
}
