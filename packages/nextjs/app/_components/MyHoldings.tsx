"use client";

import { useEffect, useState } from "react";
import { NFTCard } from "./NFTCard";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import nftsMetadata, { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends NFTMetaData {
  id: number;
  isMinted?: boolean;
}

export const MyHoldings = () => {
  // const { address: connectedAddress } = useAccount();
  const [availableNFTs, setAvailableNFTs] = useState<Collectible[]>([]);
  // const [loadingMintStatus, setLoadingMintStatus] = useState(false);

  // const { data: yourCollectibleContract } = useScaffoldContract({
  //   contractName: "YourCollectible",
  // });

  // const { data: totalSupply } = useScaffoldReadContract({
  //   contractName: "YourCollectible",
  //   functionName: "totalSupply",
  //   watch: true,
  // });

  // useEffect(() => {
  //   const updateAvailableNFTs = async (): Promise<void> => {
  //     if (totalSupply === undefined || yourCollectibleContract === undefined) return;

  //     //setLoadingMintStatus(true);
  //     const nftsWithMintStatus: Collectible[] = [];
      
  //     for (let index = 0; index < nftsMetadata.length; index++) {
  //       try {
  //         // Verificar si este NFT ya fue minteado
  //         let isMinted = false;
  //         const currentSupply = parseInt(totalSupply.toString());
          
  //         if (currentSupply > index) {
  //           // Si ya existe este token ID, está minteado
  //           try {
  //             await yourCollectibleContract.read.tokenURI([BigInt(index)]);
  //             isMinted = true;
  //           } catch {
  //             // Si falla al obtener tokenURI, no está minteado
  //             isMinted = false;
  //           }
  //         }

  //         nftsWithMintStatus.push({
  //           id: index,
  //           isMinted,
  //           ...nftsMetadata[index],
  //         });
  //       } catch (e) {
  //         console.log("Error checking mint status:", e);
  //       }
  //     }
      
  //     setAvailableNFTs(nftsWithMintStatus);
  //     //setLoadingMintStatus(false);
  //   };

  //   updateAvailableNFTs();
  // },[totalSupply, yourCollectibleContract]);
  useEffect(() => {
    // Simplemente mostramos todos los NFTs disponibles para mintear
    setAvailableNFTs(
      nftsMetadata.map((meta, index) => ({
        id: index,
        ...meta,
      }))
    );
  }, []);

  // if (loadingMintStatus)
  //   return (
  //     <div className="flex justify-center items-center mt-10">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );

  return (
    <>
      <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
        {availableNFTs.map(item => (
          <NFTCard nft={item} key={item.id} />
        ))}
      </div>
    </>
  );
};
