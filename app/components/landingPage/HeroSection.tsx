import Link from 'next/link';
import { BarChart3, Bell, Settings, FileText } from 'lucide-react';


export const HeroSection = () => {
    return (
        <section className="bg-blue-50 py-16 px-4 md:px-8 lg:px-16 overflow-visible h-170">
            <div className="max-w-7xl mx-auto">

                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-full py-1 px-4 flex items-center">
                        <div className="bg-blue-500 h-2 w-2 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Real-time Analytics</span>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="text-center mb-10 relative z-30">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Manage, Monitor, and Master<br />Your Business Data
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Get comprehensive insights on performance metrics, business trends, and key indicators, all in one powerful dashboard
                    </p>
                    <div className="flex justify-center gap-4 relative z-20">
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
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Dashboard visualization akan ditampilkan disini</p>
                        </div>
                    </div>
                </div>

                {/* Feature Icons */}
                <div className="absolute left-0 right-0 top-37 pointer-events-none z-10 backdrop-blur-sm">
                    <div className="relative max-w-7xl mx-auto">
                        {/* Analytics */}
                        <div className="absolute left-4 top-0 bg-white/70 p-2 rounded-full shadow-md backdrop-blur-md">
                            <div className="w-10 h-10 bg-blue-600/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                <BarChart3 />
                            </div>
                        </div>

                        {/* Reports */}
                        <div className="absolute right-4 top-0 bg-white/70 p-2 rounded-full shadow-md backdrop-blur-md">
                            <div className="w-10 h-10 bg-indigo-600/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                <FileText />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="absolute left-10 top-37 bg-white/70 p-2 rounded-full shadow-md backdrop-blur-md">
                            <div className="w-10 h-10 bg-red-500/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                <Bell />
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="absolute right-10 top-37 bg-white/70 p-2 rounded-full shadow-md backdrop-blur-md">
                            <div className="w-10 h-10 bg-gray-700/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                <Settings />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;