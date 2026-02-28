'use client'
import Link from 'next/link'
export default function Footer(){
    return(
        <>
<footer className="bg-[#111827] text-gray-300 py-10">
  <div className="max-w-6xl mx-auto px-4">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row justify-between gap-8">

      {/* Brand */}
      <div className="w-full md:w-1/3">
        <h2 className="text-white text-xl font-semibold mb-3">Shopies</h2>
        <p className="text-gray-400">
          Your trusted online shop for premium shoes and accessories.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li className="hover:text-[#0A84FF] cursor-pointer">Home</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">Shop</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">About</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-white font-semibold mb-3">Support</h3>
        <ul className="space-y-2">
          <li className="hover:text-[#0A84FF] cursor-pointer">FAQs</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">Shipping</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">Returns</li>
          <li className="hover:text-[#0A84FF] cursor-pointer">Privacy Policy</li>
        </ul>
      </div>

    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
      © 2025 YourStore. All rights reserved.
    </div>

  </div>
</footer>



</>


    )
}