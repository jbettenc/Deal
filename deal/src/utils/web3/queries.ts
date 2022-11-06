import { ethers } from "ethers";

import { abi } from "../../abi/IERC721MetadataUpgradeable.json";

interface DuneObject {
  contract_address: string;
  tokenId: string;
}

interface DuneObject2 {
  nft_contract_address: string;
  token_id: string;
}

async function getDuneResults(executionId: string): Promise<DuneObject[]> {
  return new Promise((resolve, reject) => {
    let res: any = undefined;
    const interval = setInterval(async () => {
      if (!res || res.state !== "QUERY_STATE_COMPLETED") {
        try {
          await fetch(`https://api.dune.com/api/v1/execution/${executionId}/results`, {
            method: "GET",
            headers: {
              "x-dune-api-key": "CjwNnmNOaWUmbXpyfSALzEDZVezcYaXo"
            }
          })
            .then((res) => res.json())
            .then((result) => {
              res = result;
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        clearInterval(interval);
        resolve(res.result.rows);
      }
    }, 2000);
  });
}

export async function getUserNFTs(account: string) {
  // TODO: this is sample data that will be retrieved from Dune (using account parameter)
  // let executionId = "";
  // try {
  //   await fetch(`https://api.dune.com/api/v1/query/1478375/execute`, {
  //     method: "POST",
  //     headers: {
  //       "x-dune-api-key": "CjwNnmNOaWUmbXpyfSALzEDZVezcYaXo"
  //     },
  //     body: JSON.stringify({
  //       query_parameters: { userAddress: account }
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       executionId = response.execution_id;
  //     });
  // } catch (err) {
  //   console.log(err);
  // }

  // const nfts: DuneObject[] = await getDuneResults(executionId);
  // const nfts: DuneObject[] = [
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "45938119534326692567555572003288708546552"
  //   },
  //   {
  //     contract_address: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "6789"
  //   },
  //   {
  //     contract_address: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "7963"
  //   },
  //   {
  //     contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  //     tokenId: "8038"
  //   },
  //   {
  //     contract_address: "0x2b1037def2aa4ed427627903bdef9bdd27ae1ea3",
  //     tokenId: "208"
  //   },
  //   {
  //     contract_address: "0x2b1037def2aa4ed427627903bdef9bdd27ae1ea3",
  //     tokenId: "210"
  //   },
  //   {
  //     contract_address: "0x2b1037def2aa4ed427627903bdef9bdd27ae1ea3",
  //     tokenId: "209"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "29604565922121646321313590846563834396533"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "17354400712967861636632104979020178784178"
  //   },
  //   {
  //     contract_address: "0xcb4307f1c3b5556256748ddf5b86e81258990b3c",
  //     tokenId: "1343"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "40833884030512615615604952891812185374702"
  //   },
  //   {
  //     contract_address: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "5458"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "17354400712967861636632104979020178784179"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "115792089237316195423570985008687907828769654247332994670094612272825818415078"
  //   },
  //   {
  //     contract_address: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "1925"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "42195013498196369469458451321539258220529"
  //   },
  //   {
  //     contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  //     tokenId: "8041"
  //   },
  //   {
  //     contract_address: "0x86c35fa9665002c08801805280ff6a077b23c98a",
  //     tokenId: "7590"
  //   },
  //   {
  //     contract_address: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
  //     tokenId: "246"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "42535295865117307932921825928971026431984"
  //   },
  //   {
  //     contract_address: "0xc17427e65dd2bd6fb6a1a7a51b27af96b5205029",
  //     tokenId: "245"
  //   },
  //   {
  //     contract_address: "0xd6c1693653b1145f01b4052c8a3fb5b1a13718dd",
  //     tokenId: "216"
  //   },
  //   {
  //     contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  //     tokenId: "8039"
  //   },
  //   {
  //     contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  //     tokenId: "8040"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "50021507937377954129116067292469927083997"
  //   },
  //   {
  //     contract_address: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
  //     tokenId: "360"
  //   },
  //   {
  //     contract_address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  //     tokenId: "8037"
  //   },
  //   {
  //     contract_address: "0x47a00fc8590c11be4c419d9ae50dec267b6e24ee",
  //     tokenId: "3804"
  //   },
  //   {
  //     contract_address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //     tokenId: "4021411785388634624018480435902308987672407524591186154272448070101644869674"
  //   },
  //   {
  //     contract_address: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "17694683079888800100095479586451946995635"
  //   },
  //   {
  //     contract_address: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
  //     tokenId: "7847"
  //   },
  //   {
  //     contract_address: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
  //     tokenId: "472"
  //   }
  // ];

  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://eth-mainnet.alchemyapi.io/v2/xTrIufa8bBMhQmEc14yrjDOV0yKIka9r"
  // );

  // const nftMetadata: NFTMetadata[] = [];
  // for (const nft of nfts) {
  //   try {
  //     await fetch(`https://deep-index.moralis.io/api/v2/nft/${nft.contract_address}/${nft.tokenId}/`, {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result) {
  //           const metadata = JSON.parse(result.metadata);
  //           nftMetadata.push({
  //             contractAddress: nft.contract_address,
  //             tokenId: nft.tokenId,
  //             name: metadata?.name ? metadata.name : "",
  //             description: result.description,
  //             image: metadata ? (metadata.image ? metadata.image : metadata.image_url) : ""
  //           });
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(nftMetadata);
  // return nftMetadata;
  let ret: any = null;
  ret = [
    {
      contractAddress: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
      tokenId: "246",
      name: "Abyssus",
      image: "https://cryptomotors.io/images/full_vehicle_body/abyssus_01_28_1_1.png"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "45938119534326692567555572003288708546552",
      name: "Parcel 134,-8",
      image: "https://api.decentraland.org/v2/parcels/134/-8/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0x1dfe7ca09e99d10835bf73044a23b73fc20623df",
      tokenId: "666688",
      name: "Bag #666688",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkJvb2s8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+RGVtb24gSHVzazwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5HcmVhdCBIZWxtPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgY2xhc3M9ImJhc2UiPkJyaWdodHNpbGsgU2FzaDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+U2lsayBTbGlwcGVyczwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTIwIiBjbGFzcz0iYmFzZSI+R2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5BbXVsZXQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjE2MCIgY2xhc3M9ImJhc2UiPlRpdGFuaXVtIFJpbmc8L3RleHQ+PC9zdmc+"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "29604565922121646321313590846563834396533",
      name: "Parcel 86,-139",
      image: "https://api.decentraland.org/v2/parcels/86/-139/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "17354400712967861636632104979020178784178",
      name: "Parcel 50,-78",
      image: "https://api.decentraland.org/v2/parcels/50/-78/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
      tokenId: "10137",
      name: "Meebit #10137",
      image: "http://meebits.app/meebitimages/characterimage?index=10137&type=full&imageType=jpg"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "17354400712967861636632104979020178784179",
      name: "Parcel 50,-77",
      image: "https://api.decentraland.org/v2/parcels/50/-77/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "50021507937377954129116067292469927083997",
      name: "Parcel 146,-35",
      image: "https://api.decentraland.org/v2/parcels/146/-35/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xce25e60a89f200b1fa40f6c313047ffe386992c3",
      tokenId: "4646",
      name: "dotdotdot 4646",
      image: "https://gateway.pinata.cloud/ipfs/QmVqMYxaEkifE7FoMkdNtryXhPNgHwA89msFQUBQbEYwKE/images/4646.png"
    }
  ];

  return ret;

  // return [
  //   {
  //     contractAddress: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "6789",
  //     name: "Cosmodino #6789",
  //     image: "https://cosmodinos.s3.eu-west-3.amazonaws.com/images/6789.png"
  //   },
  //   {
  //     contractAddress: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "7963",
  //     name: "Cosmodino #7963",
  //     image: "https://cosmodinos.s3.eu-west-3.amazonaws.com/images/7963.png"
  //   },
  //   {
  //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "40833884030512615615604952891812185374702",
  //     name: "Parcel 119,-18",
  //     image: "https://api.decentraland.org/v2/parcels/119/-18/map.png?size=24&width=1024&height=1024"
  //   },
  //   {
  //     contractAddress: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "5458",
  //     name: "Cosmodino #5458",
  //     image: "https://cosmodinos.s3.eu-west-3.amazonaws.com/images/5458.png"
  //   },
  //   {
  //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "115792089237316195423570985008687907828769654247332994670094612272825818415078",
  //     name: "Best Land",
  //     image: "https://api.decentraland.org/v2/parcels/-73/-26/map.png?size=24&width=1024&height=1024"
  //   },
  //   {
  //     contractAddress: "0x2c4929295042cb95ab1900d323d634ee8def3c7a",
  //     tokenId: "1925",
  //     name: "Cosmodino #1925",
  //     image: "https://cosmodinos.s3.eu-west-3.amazonaws.com/images/1925.png"
  //   },
  //   {
  //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "42195013498196369469458451321539258220529",
  //     name: "Parcel 123,-15",
  //     image: "https://api.decentraland.org/v2/parcels/123/-15/map.png?size=24&width=1024&height=1024"
  //   },
  //   {
  //     contractAddress: "0x86c35fa9665002c08801805280ff6a077b23c98a",
  //     tokenId: "7590",
  //     name: "CatBlox #7590",
  //     image: "https://catblox.mypinata.cloud/ipfs/QmQkd6zricHSK2n4maNXTeayZFdnfVYoqDkq15z5rk7yCe/7590.png"
  //   },
  //   {
  //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "42535295865117307932921825928971026431984",
  //     name: "Parcel 124,-16",
  //     image: "https://api.decentraland.org/v2/parcels/124/-16/map.png?size=24&width=1024&height=1024"
  //   },
  //   {
  //     contractAddress: "0x47a00fc8590c11be4c419d9ae50dec267b6e24ee",
  //     tokenId: "3804",
  //     name: "Alien Frens Evolution #3804",
  //     image: "https://gateway.pinata.cloud/ipfs/QmYNknoQhTseFzczVLxQkdKtsXrRiGuP2usPtLT77tgtT9"
  //   },
  //   {
  //     contractAddress: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  //     tokenId: "4021411785388634624018480435902308987672407524591186154272448070101644869674",
  //     name: "josephma.eth",
  //     image:
  //       "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x08e409d549c13067ded1aa6eb20c87d47a551f0b2934541120f3486f8384002a/image"
  //   },
  //   {
  //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  //     tokenId: "17694683079888800100095479586451946995635",
  //     name: "Parcel 51,-77",
  //     image: "https://api.decentraland.org/v2/parcels/51/-77/map.png?size=24&width=1024&height=1024"
  //   },
  //   {
  //     contractAddress: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
  //     tokenId: "7847",
  //     name: "alien fren #7847",
  //     image: "https://gateway.pinata.cloud/ipfs/QmbJ3XshhuW5qiJJvAks4UDvNQhwH2UkpNiC1aLm6R2LPn/7847.png"
  //   }
  // ];
}

export async function getUserTokens(account: string) {
  let ret: any[] = [];
  // await fetch(`https://deep-index.moralis.io/api/v2/${account}/erc20`, {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
  //   }
  // })
  //   .then((res) => res.json())
  //   .then((response) => {
  //     ret = response;
  //   });

  ret = [
    {
      token_address: "0xb699dab9b3f981a01abc0474f085427d20d0d602",
      name: "YeSwap.net",
      symbol: "YeSwap.net",
      logo: null,
      thumbnail: null,
      decimals: 18,
      balance: "300000000000000000000000"
    },
    {
      token_address: "0x1412eca9dc7daef60451e3155bb8dbf9da349933",
      name: "A68.net",
      symbol: "A68.net",
      logo: null,
      thumbnail: null,
      decimals: 18,
      balance: "93989280000000000000000"
    },
    {
      token_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      name: "Tether USD",
      symbol: "USDT",
      logo: "https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      thumbnail: "https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7_thumb.png",
      decimals: 6,
      balance: "500000"
    },
    {
      token_address: "0x79986af15539de2db9a5086382daeda917a9cf0c",
      name: null,
      symbol: null,
      logo: null,
      thumbnail: null,
      decimals: null,
      balance: "9"
    },
    {
      token_address: "0x45dd18c5e0fa701abff449f6542aa53e258710b4",
      name: "SomniLife",
      symbol: "SO",
      logo: null,
      thumbnail: null,
      decimals: 18,
      balance: "402872940600000000000000"
    },
    {
      token_address: "0xad9f583f255ea7fba4321f84cba57c3bbd2f0687",
      name: "voteFork.com",
      symbol: "voteFork.com",
      logo: null,
      thumbnail: null,
      decimals: 0,
      balance: "263874"
    },
    {
      token_address: "0xad9f4b58e3c55a5600f4f0ac10886a1771a0a5cb",
      name: "Decentraland LAND Token",
      symbol: "Land-DAO.io",
      logo: null,
      thumbnail: null,
      decimals: 18,
      balance: "5555000000000000000000"
    }
  ];

  return ret;
}

export async function getCollections() {
  // let executionId = "";
  // try {
  //   await fetch(`https://api.dune.com/api/v1/query/1532102/execute`, {
  //     method: "POST",
  //     headers: {
  //       "x-dune-api-key": "CjwNnmNOaWUmbXpyfSALzEDZVezcYaXo"
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       executionId = response.execution_id;
  //     });
  // } catch (err) {
  //   console.log(err);
  // }

  // // @ts-ignore
  // const collections: DuneObject2[] = await getDuneResults(executionId);
  // console.log(collections);

  // const nftMetadata: NFTMetadata[] = [];
  // for (const collection of collections) {
  //   try {
  //     await fetch(
  //       `https://deep-index.moralis.io/api/v2/nft/${collection.nft_contract_address}/${collection.token_id}/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
  //         }
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result) {
  //           const metadata = JSON.parse(result.metadata);
  //           nftMetadata.push({
  //             contractAddress: collection.nft_contract_address,
  //             tokenId: collection.token_id,
  //             name: metadata?.name ? metadata.name : "",
  //             description: result.description,
  //             image: metadata ? (metadata.image ? metadata.image : metadata.image_url) : ""
  //           });
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(nftMetadata);
  // return nftMetadata;
  let ret: any = null;
  ret = [
    {
      contractAddress: "0x30a2fa3c93fb9f93d1efeffd350c6a6bb62ba000",
      tokenId: "246",
      name: "Abyssus",
      image: "https://cryptomotors.io/images/full_vehicle_body/abyssus_01_28_1_1.png"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "45938119534326692567555572003288708546552",
      name: "Parcel 134,-8",
      image: "https://api.decentraland.org/v2/parcels/134/-8/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0x1dfe7ca09e99d10835bf73044a23b73fc20623df",
      tokenId: "666688",
      name: "Bag #666688",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkJvb2s8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+RGVtb24gSHVzazwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5HcmVhdCBIZWxtPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgY2xhc3M9ImJhc2UiPkJyaWdodHNpbGsgU2FzaDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+U2lsayBTbGlwcGVyczwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTIwIiBjbGFzcz0iYmFzZSI+R2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5BbXVsZXQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjE2MCIgY2xhc3M9ImJhc2UiPlRpdGFuaXVtIFJpbmc8L3RleHQ+PC9zdmc+"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "29604565922121646321313590846563834396533",
      name: "Parcel 86,-139",
      image: "https://api.decentraland.org/v2/parcels/86/-139/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "17354400712967861636632104979020178784178",
      name: "Parcel 50,-78",
      image: "https://api.decentraland.org/v2/parcels/50/-78/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
      tokenId: "10137",
      name: "Meebit #10137",
      image: "http://meebits.app/meebitimages/characterimage?index=10137&type=full&imageType=jpg"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "17354400712967861636632104979020178784179",
      name: "Parcel 50,-77",
      image: "https://api.decentraland.org/v2/parcels/50/-77/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
      tokenId: "50021507937377954129116067292469927083997",
      name: "Parcel 146,-35",
      image: "https://api.decentraland.org/v2/parcels/146/-35/map.png?size=24&width=1024&height=1024"
    },
    {
      contractAddress: "0xce25e60a89f200b1fa40f6c313047ffe386992c3",
      tokenId: "4646",
      name: "dotdotdot 4646",
      image: "https://gateway.pinata.cloud/ipfs/QmVqMYxaEkifE7FoMkdNtryXhPNgHwA89msFQUBQbEYwKE/images/4646.png"
    }
  ];
  return ret;
}

export async function getNFTMetadata(nfts: DuneObject[]) {
  const nftMetadata: NFTMetadata[] = [];
  for (const nft of nfts) {
    try {
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
              name: metadata?.name ? metadata.name : "",
              description: result.description,
              image: metadata ? (metadata.image ? metadata.image : metadata.image_url) : ""
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  return nftMetadata;
}
