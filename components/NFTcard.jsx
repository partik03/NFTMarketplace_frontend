import Image from "next/image"

const NFTcard = ({data}) => {
  console.log(data);
  return (
    <>
    {
      data && 
      <div
      className="rounded-2xl  flex flex-col justify-center bg-secondary w-full h-80 shadow-2xl"
     >
      <img src={data.image} alt="" style={{height:"20rem",widht:"20rem"}} className="w-30 h-30" />
         {/* <Image src={data.image} width={350} height={500} className="image"/>  */}
         <div className="px-6 mt-8 text-xl font-bold">{data.name}</div>
         <div className="px-6 pb-4 font-extrabold">{data.price}</div>
 
     </div>
    }
   </>
  )
}

export default NFTcard