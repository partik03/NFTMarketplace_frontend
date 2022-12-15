import Image from "next/image"

const NFTcard = () => {
  return (
    <div
     className="rounded-2xl shadow-lg flex flex-col justify-center bg-secondary w-full h-80 shadow-2xl"
    >
        <Image src="/1.jpg" width={350} height={500} className="image"/>
        <div className="px-6 mt-8 text-xl font-bold">Bikram Singh Majitgia</div>
        <div className="px-6 pb-4 font-extrabold">Price</div>

    </div>
  )
}

export default NFTcard