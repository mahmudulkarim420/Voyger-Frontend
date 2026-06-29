import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#F4EBE4] mt-auto">
      {/* এখানে grid-cols-1 এর বদলে grid-cols-2 দেওয়া হয়েছে মোবাইলের জন্য */}
      <div className="container-standard section-padding grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-8 lg:gap-12">
        
        {/* Logo Section - মোবাইলে ফুল উইডথ (col-span-2) */}
        <div className="col-span-2 md:col-span-3">
          <Link href="/" className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10 L16 30 L28 10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="miter"
              />
              <path d="M16 2 L16 30" stroke="black" strokeWidth="1.5" />
              <path d="M10 6 L10 20" stroke="black" strokeWidth="1.5" />
              <path d="M22 6 L22 20" stroke="black" strokeWidth="1.5" />
              <path d="M4 10 L10 10" stroke="black" strokeWidth="1.5" />
              <path d="M22 10 L28 10" stroke="black" strokeWidth="1.5" />
            </svg>
            <span className="text-xl font-medium tracking-[0.2em] mt-1 text-black">VOYΛGE</span>
          </Link>
        </div>

        {/* Our Info - মোবাইলে অর্ধেক উইডথ (col-span-1) */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-900">
            OUR INFO
          </h4>
          <ul className="space-y-4 text-sm text-gray-800">
            <li>
              <Link href="/about" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                About
              </Link>
            </li>
            <li>
              <Link href="/shop" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/faq" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/find-store" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Find Store
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies - মোবাইলে অর্ধেক উইডথ (col-span-1) */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-900">
            POLICIES
          </h4>
          <ul className="space-y-4 text-sm text-gray-800">
            <li>
              <Link href="/privacy-policy" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Terms Of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="relative pb-0.5 inline-block hover:text-black transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                Contact Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us - মোবাইলে ফুল উইডথ (col-span-2) */}
        <div className="col-span-2 md:col-span-3">
          <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-900">
            CONTACT US
          </h4>
          <ul className="space-y-4 text-sm text-gray-800">
            <li className="uppercase tracking-widest text-xs text-gray-900">
              FOR ANY HELP YOU MAY CALL US AT
            </li>
            <li>
              <strong>Phone:</strong> +880 9639279055
            </li>
            <li>
              <strong>Email:</strong> Info@Voyagetm.Com
            </li>
            <li>Open 24 Hours A Day, 7 Days A Week</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D5C1B6]/30">
        <div className="container-standard py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left">
          <div className="text-sm text-gray-800">
            © Copyright Reserved to <strong className="font-semibold">Voyage</strong>
          </div>

          <div className="flex flex-wrap justify-center gap-3 items-center">
            {/* Visa */}
            <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center w-[46px] h-[28px]">
              <svg
                viewBox="0 0 32 10"
                className="h-[10px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6 0.5L8.9 9.5H4.2L6.8 0.5H13.6ZM20.9 0.5C23.5 0.5 25.1 1.7 25.1 3.5C25.1 6.5 20.8 6.7 20.8 8.1C20.8 8.6 21.3 9.1 22.1 9.1C23 9.1 24.3 8.7 25.2 8.1L26 9.5C24.8 10.1 23 10.5 21.4 10.5C18.6 10.5 16.7 9.1 16.7 7.2C16.7 4.1 21 3.8 21 2.5C21 2 20.5 1.5 19.6 1.5C18.6 1.5 17.5 1.9 16.5 2.5L15.6 1.1C16.8 0.5 18.8 0 20.9 0.5ZM31.2 0.5L28.1 6.8L27.6 4.3C27.3 2.7 26 1.3 24 0.5L25.3 9.5H29.6L32 0.5H31.2ZM4.1 0.5H0L2.6 9.5H6.7L4.1 0.5Z"
                  fill="#1434CB"
                />
              </svg>
            </div>
            {/* PayPal */}
            <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center w-[46px] h-[28px]">
              <span className="text-[#003087] font-bold italic text-[11px]">PayPal</span>
            </div>
            {/* Mastercard */}
            <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center w-[46px] h-[28px] relative overflow-hidden">
              <div className="w-4 h-4 rounded-full bg-[#EB001B] absolute left-2 opacity-90"></div>
              <div className="w-4 h-4 rounded-full bg-[#F79E1B] absolute right-2 opacity-90 mix-blend-multiply"></div>
            </div>
            {/* AMEX */}
            <div className="bg-[#006FCF] px-2 py-1 rounded shadow-sm flex items-center justify-center w-[46px] h-[28px]">
              <span className="font-bold text-[8px] leading-none text-center text-white">
                AM
                <br />
                EX
              </span>
            </div>
            {/* Diners / Discover */}
            <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center w-[46px] h-[28px]">
              <svg
                viewBox="0 0 24 24"
                className="h-5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8" fill="#005A9C" />
                <path
                  d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                  fill="white"
                />
                <path
                  d="M14.5 12c0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};