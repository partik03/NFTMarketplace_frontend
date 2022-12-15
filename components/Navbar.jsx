import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
const Navbar = ({setAccount,account}) => {

  const router = useRouter()
  

  const connectWallet = async() => {
    if(!window.ethereum) {
      alert("Please install MetaMask")
      return;
    }
    const chainId = await window.ethereum.request({method: "eth_chainId"})
    console.log(chainId);
    if(chainId != "0x13881") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: "0x13881"}]
      })
    }

    window.ethereum.request({method: "eth_requestAccounts"})
    .then(accounts => {
      console.log(accounts[0])
      localStorage.setItem("wallet", accounts[0])
      setAccount(accounts[0])
    })
    .catch(err =>{
      console.error(err)
    })
  }

  useEffect(() => {
    const connected = window.ethereum.isConnected();
    if(!connected) {
      connectWallet()
    }
  }, [])
  
  return (
    <div 
     className="text-white h-20 w-full flex justify-between items-center  px-10 "
    >
        <div >Logo</div>
        <div 
        className="flex w-2/3 justify-between items-center"
        >
          <div 
          className="grid grid-flow-col  w-2/3 justify-around items-center text-white"
          >
            <Link href="/"><div className={`${router.route=="/" ? "active_route" : ""} navdiv py-4`}>Marketplace</div></Link> 
            <Link href="/mynfts"><div className={`${router.route =="/mynfts" ? "active_route" : ""} navdiv py-4`}>List My NFTs</div></Link>
            <Link href="/profile"><div className={`${router.route == "/profile" ? "active_route" : ""} navdiv py-4`}>Profile</div></Link>

          </div>
          <div className="">
            <button
             className="nav_btn bg-emerald-400 text-white px-4 py-2 rounded-md"
             onClick={connectWallet}
            >{!account ? "Connect Wallet" : account}</button>
          </div>
        </div>
    </div>
  )
}

export default Navbar