import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as Market from "../../utils/abi.json"
const index = () => {
    const address = process.env.CONTRACT_ADDRESS
    const router = useRouter()
    const [nft, setNft] = useState(null)
    const tokenId = router.query.tokenId;
    const getNFT = async ()=>{
        let provider = await new ethers.providers.Web3Provider(window.ethereum,"any")
        await provider.send("eth_requestAccounts",[])
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(address,Market.abi,signer)
        console.log(contract);
        const transaction = await contract.getListedForTokenId(Number(tokenId));
        console.log(transaction,Number(tokenId));
        const tokenUri = await contract.tokenURI(transaction.tokenId);
        console.log(tokenUri);
        let meta = await axios.get(tokenUri);
        console.log(meta);
        meta = Object.keys(meta.data)[0];
        let price = ethers.utils.formatUnits(transaction.price.toString(),"ether")
        let itemData ={
            price,
            tokenId:transaction.tokenId.toNumber(),
            seller:transaction.seller,
            owner:transaction.owner,
            image:meta.image,
            name:meta.name,
            description:meta.description,
        }
        console.log(itemData);
        setNft(itemData)
    }
  return (
    <div className='w-screen h-screen bg-primary flex items-center justify-center '>
        <div className='px-[5%] py-[3%] bg-secondary w-[90%]  h-[90%] rounded-3xl  shadow flex items-center'>
        <div className=' w-[100%] h-[100%] flex justify-between'>
        <div className='w-[40%] bg-primary shadow rounded-3xl flex item-center flex-col justify-center'>
            <img src="/1.jpg" alt="" className='w-full ' />
        </div>
        <div className='w-[40%] bg-primary shadow rounded-3xl py-8 px-8 text-white'>
            <div className='py-4 text-xl'>
                Name :
            </div>
            <div className='py-4 text-xl'>
                Description :
            </div>
            <div className='py-4 text-xl'>
                Price :
            </div>
            <div className='py-4 text-xl'>
                Owner :
            </div>
            <div className='py-4 text-xl'>
                Seller :
            </div>
            <div >
                <button className='bg-emerald-400 py-3 px-4 nav_btn rounded-xl' onClick={getNFT}>Buy This NFT</button>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default index