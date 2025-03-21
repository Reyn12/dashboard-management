'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-blue-900 text-white">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Dashboard Management</h3>
            <p className="text-blue-200 text-sm">
              The best solution for your data management and dashboard visualization.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-blue-200 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-blue-200 hover:text-white transition-colors">
                  Dashboard Analytics
                </Link>
              </li>
              <li>
                <Link href="/data-management" className="text-blue-200 hover:text-white transition-colors">
                  Data Management
                </Link>
              </li>
              <li>
                <Link href="/reporting" className="text-blue-200 hover:text-white transition-colors">
                  Automated Reports
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-blue-200 hover:text-white transition-colors">
                  API Integrations
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-start space-x-2 text-blue-200">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <p>
                123 Technology Street<br />
                New York, USA
              </p>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <Mail size={18} className="flex-shrink-0" />
              <p>info@dashboardmanagement.com</p>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <Phone size={18} className="flex-shrink-0" />
              <p>+1 (555) 123-4567</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-blue-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-blue-200 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dashboard Management. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-blue-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-200 hover:text-white text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;