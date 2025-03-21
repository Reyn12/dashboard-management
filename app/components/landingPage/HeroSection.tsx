'use client'
import Link from 'next/link';
import { BarChart3, Bell, Settings, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative py-16 px-4 md:px-8 lg:px-16 overflow-visible h-170">
            {/* Animated gradient background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-800 animate-gradient-slow"
                    style={{
                        transform: `translateY(${scrollY * 0.05}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                ></motion.div>
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-[80px] animate-blob"
                        style={{
                            transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.02}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-[70px] animate-blob animation-delay-2000"
                        style={{
                            transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.01}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-[90px] animate-blob animation-delay-4000"
                        style={{
                            transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.03}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    ></motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Badge */}
                <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-full py-1 px-4 flex items-center">
                        <div className="bg-blue-500 h-2 w-2 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Real-time Analytics</span>
                    </div>
                </motion.div>

                {/* Hero Content */}
                <motion.div 
                    className="text-center mb-10 relative z-30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                        Manage, Monitor, and Master<br />Your Business Data
                    </h1>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Get comprehensive insights on performance metrics, business trends, and key indicators, all in one powerful dashboard
                    </p>
                    <motion.div 
                        className="flex justify-center gap-4 relative z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link href="/admin/login">
                            <motion.button 
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-indigo-500/50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start your free trial
                            </motion.button>
                        </Link>
                        <Link href="/admin/login">
                            <motion.button 
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium py-3 px-6 rounded-full border border-white/20 transition-all shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book a demo
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Dashboard Image */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 1, 
                        delay: 0.6,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    <motion.div 
                        className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-4 w-full max-w-4xl mx-auto border border-white/20 overflow-hidden"
                        animate={{ 
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    >
                        <div className="relative aspect-[16/9]">
                            <div className="absolute inset-0">
                                <motion.div
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src="/images/dashboard-admin2.webp"
                                        alt="Dashboard Admin Preview"
                                        fill
                                        priority
                                        className="object-cover rounded-md"
                                    />
                                </motion.div>
                            </div>
                            
                            {/* Analytics */}
                            <div className="absolute left-4 top-0 bg-white/10 p-2 rounded-full shadow-md backdrop-blur-md">
                                <motion.div 
                                    className="w-10 h-10 bg-blue-600/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                                    animate={{ 
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                >
                                    <BarChart3 />
                                </motion.div>
                            </div>

                            {/* Reports */}
                            <div className="absolute right-4 top-0 bg-white/10 p-2 rounded-full shadow-md backdrop-blur-md">
                                <motion.div 
                                    className="w-10 h-10 bg-indigo-600/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                                    animate={{ 
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                >
                                    <FileText />
                                </motion.div>
                            </div>

                            {/* Notifications */}
                            <div className="absolute left-10 top-37 bg-white/10 p-2 rounded-full shadow-md backdrop-blur-md">
                                <motion.div 
                                    className="w-10 h-10 bg-red-500/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                                    animate={{ 
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                >
                                    <Bell />
                                </motion.div>
                            </div>

                            {/* Settings */}
                            <div className="absolute right-10 top-37 bg-white/10 p-2 rounded-full shadow-md backdrop-blur-md">
                                <motion.div 
                                    className="w-10 h-10 bg-purple-600/70 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                                    animate={{ 
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: 1.5
                                    }}
                                >
                                    <Settings />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;