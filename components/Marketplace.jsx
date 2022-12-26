import NFTcard from "./NFTcard"

export const Marketplace = ({nfts}) => {
  return (
    <div className="market bg-primary mt-8 text-white rounded-lg w-full grid grid-cols-5 py-8 px-5  gap-8 ">
      {nfts && nfts.map((nft,index)=>{
        return <NFTcard key={index} data={nft}/>
      })}
      {
        nfts && nfts.forEach(e=>{
          console.log(e.name);
        })
      }
      
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
       
    </div>
  )
}
