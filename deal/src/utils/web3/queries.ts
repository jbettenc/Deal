import { ethers } from "ethers";

import { abi } from "../../abi/IERC721MetadataUpgradeable.json";

interface DuneObject {
  contract_address: string;
  tokenId: string;
  name: string;
  category?: string;
  balance: number;
}

export async function getUserNFTs(account: string) {
  // TODO: this is sample data that will be retrieved from Dune (using account parameter)
  const nfts: DuneObject[] = [
    {
      contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "42535295865117307932921825928971026431984",
      name: "Decentraland",
      category: "Virtual Worlds",
      balance: 9
    },
    {
      contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
      tokenId: "8037",
      name: "CHILL RX",
      category: "Collectibles",
      balance: 5
    },
    {
      contract_address: "0x2b1037def2aa4ed427627903bdef9bdd27ae1ea3",
      tokenId: "208",
      name: "Square-Bears-NFT",
      balance: 3
    },
    {
      contract_address: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
      tokenId: "472",
      name: "CryptoMotors",
      balance: 3
    },
    {
      contract_address: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
      tokenId: "1925",
      name: "Cosmodinos Omega",
      balance: 2
    },
    {
      contract_address: "0x86c35fa9665002c08801805280ff6a077b23c98a",
      tokenId: "7590",
      name: "CatBlox Genesis Collection",
      category: "Collectibles",
      balance: 1
    },
    {
      contract_address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      tokenId: "4021411785388634624018480435902308987672407524591186154272448070101644869674",
      name: "Ethereum Name Service (ENS)",
      category: "Domain Names",
      balance: 1
    }
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/xTrIufa8bBMhQmEc14yrjDOV0yKIka9r"
  );

  const nftMetadata: NFTMetadata[] = [];
  for (const nft of nfts) {
    const contract = new ethers.Contract(nft.contract_address, abi, provider);
    try {
      const metadataUrl = await contract.tokenURI(nft.tokenId);
      await fetch(metadataUrl, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res) {
            throw new Error();
          }

          nftMetadata.push({
            contractAddress: nft.contract_address,
            tokenId: nft.tokenId,
            name: res.name,
            description: res.description,
            image: res.image ? res.image : res.image_url
          });
        });
    } catch (err) {
      await fetch(`https://deep-index.moralis.io/api/v2/nft/${nft.contract_address}/${nft.tokenId}/`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
        }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            const metadata = JSON.parse(result.metadata);
            nftMetadata.push({
              contractAddress: nft.contract_address,
              tokenId: nft.tokenId,
              name: metadata.name,
              description: result.description,
              image: metadata.image ? metadata.image : metadata.image_url
            });
          }
        });
    }
  }

  return nftMetadata;
}
