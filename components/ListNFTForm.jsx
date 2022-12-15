export const ListNFTForm = ({formParams,message,onChangeFile,updateFormParams,listNFT}) => {
  return (
    <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-formbg shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-emerald-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-emerald-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border-none rounded w-full py-2 px-3 bg-tertiary text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-emerald-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 bg-tertiary text-white leading-tight border-none focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-emerald-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow bg-tertiary appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-emerald-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={onChangeFile}></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={listNFT} className="font-bold mt-5 w-full bg-emerald-500 text-white rounded p-2 shadow-lg">
                    List NFT
                </button>
            </form>
        </div>
  )
}
