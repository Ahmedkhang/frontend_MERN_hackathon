'use client';
// import Link from "next/link"

// export default function Navbar(){
  

//     return(
//         <>
//         <nav className="w-full text-gray-200 h-20 bg-[#111827] flex justify-between items-center p-5">
//             <div className="w-[25%]">
//                 <Link href={'/'}>
//                  <h1 className='text-xl font-bold'>Shopies</h1>
//                 </Link>
//             </div>
// <div className="w-[50%] hidden md:flex">
//   <ul className="w-full flex justify-center gap-5 [&>li]:text-gray-200 [&>li:hover]:text-[#0A84FF]">
    
//     <li><Link href="/shoes">Shoes</Link></li>
//     <li><Link href="/shorts">Shorts</Link></li>
//     <li><Link href="/services-">Services</Link></li>
//     <li><Link href="/contact">Contact</Link></li>
//     <li><Link href="/about">About</Link></li>

//   </ul>
// </div>


//             <div className="w-[25%] flex gap-2 md:gap-5 justify-end [&>button:hover]:bg-[rgb(17,24,39)] [&>button:hover]:cursor-pointer ">
//                 <button className="bg-[#0A84FF] p-2 rounded font-bold duration-300">Signup</button>
//                 <button className="bg-[#0A84FF] p-2 rounded font-bold duration-300">Login</button>
                
//             </div>
//         </nav>
//         </>
//     )
// }

'use client';
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full text-gray-200 h-20 bg-[#0F172A] flex justify-between items-center p-5 relative">
      
      {/* Logo */}
      <div className="w-[25%]">
        <h1 className='text-xl font-bold'>Shopies</h1>
      </div>

      {/* Desktop Menu */}
      <div className="w-[50%] hidden md:flex">
        <ul className="w-full flex justify-center gap-5 [&>li]:text-primary [&>li:hover]:text-[#0A84FF]">
          <li><button>Shoes</button></li>
          <li><button>Shorts</button></li>
          <li><button>Services</button></li>
          <li><button>Contact</button></li>
          <li><button>About</button></li>
        </ul>
      </div>

      {/* Right Buttons + Hamburger */}
      <div className="w-[25%] flex justify-end items-center gap-2 md:gap-5">
        {/* <button className="bg-[#2072AF] hover:bg-orange-700 p-2 rounded font-bold duration-300 hidden md:block">Signup</button> */}
        {/* <button className="bg-[#2072AF] p-2 rounded font-bold duration-300 hidden md:block">Login</button> */}

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden ml-2 border border-gray-400 px-2 py-1 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#111827] flex flex-col items-center gap-3 p-4 md:hidden">
          <button onClick={() => setIsOpen(false)}>Shoes</button>
          <button onClick={() => setIsOpen(false)}>Shorts</button>
          <button onClick={() => setIsOpen(false)}>Services</button>
          <button onClick={() => setIsOpen(false)}>Contact</button>
          <button onClick={() => setIsOpen(false)}>About</button>
          <button className="bg-[#0A84FF] p-2 rounded font-bold w-full mt-2">Signup</button>
          <button className="bg-[#0A84FF] p-2 rounded font-bold w-full">Login</button>
        </div>
      )}

    </nav>
  );
}
