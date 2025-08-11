import { useState } from "react";
import { Collectible } from "./MyHoldings";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const { address: connectedAddress } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourCollectible" });

  const handleMint = async () => {
    if (!connectedAddress) return;
    setIsMinting(true);
    const notificationId = notification.loading("Uploading to IPFS");
    try {
      // Sube la metadata de este NFT a IPFS
      const uploadedItem = await addToIPFS(nft);
      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");
      // Llama al contrato para mintear el NFT con la cuenta conectada y el path de IPFS
      await writeContractAsync({
        functionName: "mintItem",
        args: [connectedAddress, uploadedItem.path],
      });
    } catch (err) {
      notification.remove(notificationId);
      console.error("Error minting NFT:", err);
    } finally {
      setIsMinting(false);
    }
  };



  return (
    <div className="card card-compact bg-base-100 shadow-lg w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line  */}
        <img src={nft.image} alt="NFT Image" className="h-60 min-w-full" />
        <figcaption className="glass absolute bottom-4 left-4 p-4 rounded-xl">
          <span className="text-white">#{nft.id}</span>
        </figcaption>
      </figure>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-xl p-0 m-0 font-semibold">{nft.name}</p>
          <div className="flex flex-wrap space-x-2 mt-1">
            {nft.attributes?.map((attr, index) => (
              <span key={index} className="badge badge-primary px-1.5">
                {attr.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center mt-1">
          <p className="my-0 text-lg">{nft.description}</p>
        </div>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary btn-md px-8 tracking-wide"
            onClick={handleMint}
            disabled={isMinting || !connectedAddress}
          >
            {isMinting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Minting...
              </>
            ) : (
              "Mint NFT"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
