import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NFTcard from '../components/NFTcard';
import  Market from "../utils/abi.json";
const profile = () => {
  const address = process.env.CONTRACT_ADDRESS
  const [data, setData] = useState([])
  const [account, setAccount] = useState(null)
  const totalPrice = 0;
  const getMyNFTs = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, Market.abi, signer);
    const transaction = await contract.getMyNFTS();
    const items  = await Promise.all(
      transaction.map(async (item) => {
        console.log(item);
        const tokenUri = await contract.tokenURI(item.tokenId);
        // console.log(tokenUri);
        let meta = await axios.get(tokenUri);
        meta = Object.keys(meta.data)[0];
        console.log(meta);
        let price = ethers.utils.formatUnits(item.price.toString(), "ether");
        let itemData = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        }
        return itemData;
      })
    )
    setData(items);
  }
  return (
    <div
    className='bg-primary w-screen h-screen'
    >
        <Navbar setAccount={setAccount} account={account}/>
        <div className="profileClass">
            <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
                <div className="mb-5">
                    <h2 className="font-bold">Wallet Address</h2>  
                    {address}
                </div>
            </div>
            <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
                    <div>
                        <h2 className="font-bold">No. of NFTs</h2>
                        {data.length}
                    </div>
                    <div className="ml-20">
                        <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
                    </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-white">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {data.map((value, index) => {
                    return <NFTcard data={value} key={index} />;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
    </div>
  )
}

export default profile