import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-blue-50 py-4 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-blue-600 font-bold text-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2">
              <rect width="24" height="24" rx="6" fill="#3B82F6" />
              <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Cyber Market
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            How it works
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            About Us
          </Link>
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            Pricing
          </Link>
        </div>

        {/* CTA Button */}
        <div>
          <Link href="/demo">
            <button className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors">
              Book the demo
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button (hidden on desktop) */}
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};