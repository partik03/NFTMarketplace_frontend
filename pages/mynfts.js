import React, { useState } from 'react'
import { ListNFTForm } from '../components/ListNFTForm'
import Navbar from '../components/Navbar'
import { uploadFileToIPFS } from '../pinata/pinata'
import * as Marketplace from "../utils/abi.json"

const mynfts = () => { 
    console.log(Marketplace);
    const [formParams, updateFormParams] = useState({name:'', description:'', price:''})
    const [message, setMessage] = useState(null)
    const [fileURL, setFileURL] = useState(null)
    const onChangeFile =async(e)=>{
        const file = e.target.files[0]
        console.log(file);
        try {
            const response = await uploadFileToIPFS(file)
            console.log(response);
            if(response.success ==true){
                console.log("File uploaded to pinata");
                setFileURL(response.pinataURL)
            }
        } catch (error) {
            console.error("Failer to upload to pinata",error)
        }
    }

    const uploadMetadataToIPFS = async()=>{
        const {name, description, price} = formParams
        if(!name || !description || !price || !fileURL){
            // setMessage("Please fill all the fields")
            return
        }
        const metadata = JSON.stringify({
            name,
            description,
            image: fileURL,
            price
        })
        try {
            const response = await uploadFileToIPFS(metadata)
            if(response.success ==true){
                console.log("Metadata uploaded to pinata");
                return response.pinataURL
            }
            
        } catch (error) {
            console.log("Failed to upload Metadata",error)
        }
    }

    const listNFT = async(e)=>{
        e.preventDefault()
        try {
            const metaURL = await uploadMetadataToIPFS()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()
            const transaction = await contract.createToken(metaURL,price,{value:listingPrice})
            await transaction.wait()
            alert("NFT listed successfully")

            updateFormParams({name:'', description:'', price:''})
            window.location.replace('/')
        } catch (error) {
            console.error("Failer to list the NFT",error)
            alert("Failer to list the NFT")
        }
    }

  return (
    <div 
    className='bg-primary w-screen '
    >
        <Navbar/>

        <div>
            <ListNFTForm  formParams={formParams} message={message} onChangeFile={onChangeFile}  updateFormParams={updateFormParams} listNFT={listNFT} />
        </div>

    </div>
  )
}

export default mynfts