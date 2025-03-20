import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="bg-blue-50 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Logo dan Navigation sudah ada di Navbar component */}
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full py-1 px-4 flex items-center">
            <div className="bg-blue-500 h-2 w-2 rounded-full mr-2"></div>
            <span className="text-sm font-medium">Real-time Analytics</span>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Manage, Monitor, and Master<br />Your Business Data
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get comprehensive insights on performance metrics, business trends, and key indicators, all in one powerful dashboard
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/trial">
              <button className="bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-all">
                Start your free trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="bg-white hover:bg-gray-100 text-indigo-800 font-medium py-3 px-6 rounded-full border border-indigo-200 transition-all">
                Book a demo
              </button>
            </Link>
          </div>
        </div>
        
        {/* Dashboard Image */}
        <div className="relative">
          {/* Nanti kita ganti dengan gambar dashboard asli */}
          <div className="bg-white rounded-lg shadow-xl p-4 aspect-[16/9] w-full max-w-4xl mx-auto">
            {/* Komentar: Disini nanti kita taruh gambar dashboard analytics */}
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Dashboard visualization akan ditampilkan disini</p>
            </div>
          </div>
        </div>
        
        {/* Feature Icons */}
        <div className="absolute left-0 right-0 top-1/2 pointer-events-none">
          <div className="relative max-w-7xl mx-auto">
            {/* Analytics */}
            <div className="absolute left-4 top-0 bg-white p-2 rounded-full shadow-md">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
                  <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
                  <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            
            {/* Reports */}
            <div className="absolute right-4 top-0 bg-white p-2 rounded-full shadow-md">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="absolute left-20 top-40 bg-white p-2 rounded-full shadow-md">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>
            
            {/* Settings */}
            <div className="absolute right-20 top-40 bg-white p-2 rounded-full shadow-md">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;