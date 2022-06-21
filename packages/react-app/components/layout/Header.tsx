import * as React from "react";
import Image from "next/image";
import { useCelo } from '@celo/react-celo';
import { truncateAddress} from "@/utils";
import {HiMenuAlt4 } from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from "@/public/superday.png"

interface NavbarProps {
  title: string;
  classProps?: string;
}
const NavbarItem = ({title, classProps}: NavbarProps) => {
  return (
      <li className={`mx-4 cursor-pointer ${classProps}`}>
          <span>{title}</span>
      </li>
  )
}


export function Header() {
  const { address, connect, kit } = useCelo();
  const [toggleMenu, setToggleMenu] = React.useState(false)

  return (
    <nav  className='w-full flex md:justify-center justify-between items-center p-4'>
    <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <Image src={logo} alt='logo' width={62} height={42}/>
    </div>
    <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {['Create', 'Pledge', 'Claim', 'Refund'].map((item, index) => (
            <NavbarItem title={item} key={index} />
        ))}
        {!address ? (
          <button onClick={() => connect().catch(e => console.log(e))}  className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
          Login
      </button> 
        ) : (
          <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            {truncateAddress(address)}
        </li> 
        )}
    </ul>
    <div className='flex relative '>
        {toggleMenu
         ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/>
         : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>}
         {toggleMenu && 
             <ul
              className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex 
              flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
              '
             >
               <li className='text-xl w-full my-2'>
                 <AiOutlineClose onClick={() => setToggleMenu(false)} />
               </li>
               {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
                      <NavbarItem title={item} classProps='my-2 text-lg' key={index}/>
                 ))}
             </ul>
             }
    </div>
</nav>
  );
}
