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
  let executionId = "";
  try {
    await fetch(`https://api.dune.com/api/v1/query/1478375/execute`, {
      method: "POST",
      headers: {
        "x-dune-api-key": "CjwNnmNOaWUmbXpyfSALzEDZVezcYaXo"
      },
      body: JSON.stringify({
        query_parameters: { userAddress: account }
      })
    })
      .then((res) => res.json())
      .then((response) => {
        executionId = response.execution_id;
      });
  } catch (err) {
    console.log(err);
  }

  const nfts: DuneObject[] = await getDuneResults(executionId);

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

export async function getUserTokens(account: string) {
  let ret: any[] = [];
  await fetch(`https://deep-index.moralis.io/api/v2/${account}/erc20`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
    }
  })
    .then((res) => res.json())
    .then((response) => {
      ret = response;
    });

  return ret;
}

export async function getCollections() {
  let executionId = "";
  try {
    await fetch(`https://api.dune.com/api/v1/query/1532102/execute`, {
      method: "POST",
      headers: {
        "x-dune-api-key": "CjwNnmNOaWUmbXpyfSALzEDZVezcYaXo"
      }
    })
      .then((res) => res.json())
      .then((response) => {
        executionId = response.execution_id;
      });
  } catch (err) {
    console.log(err);
  }

  // @ts-ignore
  const collections: DuneObject2[] = await getDuneResults(executionId);

  const nftMetadata: NFTMetadata[] = [];
  for (const collection of collections) {
    try {
      await fetch(
        `https://deep-index.moralis.io/api/v2/nft/${collection.nft_contract_address}/${collection.token_id}/`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-Key": "M73LU41x0KUFj1SHyMIDrrzPTpXpKggKHhLEmwHwmiH4A2ARO8LlkaIJzBFHTlEd"
          }
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            const metadata = JSON.parse(result.metadata);
            nftMetadata.push({
              contractAddress: collection.nft_contract_address,
              tokenId: collection.token_id,
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
