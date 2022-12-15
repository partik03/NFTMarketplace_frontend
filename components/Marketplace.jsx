import NFTcard from "./NFTcard"

export const Marketplace = () => {
  return (
    <div className="market bg-primary mt-8 text-white rounded-lg w-full grid grid-cols-5 py-8 px-5  gap-8 ">
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
      <NFTcard/>
       
    </div>
  )
}
