import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { RiLeafFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="mt-auto w-full">
      <footer className="bg-green-100 text-green-900 py-4 shadow-inner rounded-t-2xl text-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

      {/* Brand & Mission */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center mb-2">
          <RiLeafFill className="text-2xl text-green-600 mr-2" />
          <h2 className="text-2xl font-semibold text-green-800">ReEarth</h2>
        </div>
        <p className="text-xs text-green-700 max-w-xs leading-relaxed">
          Empowering communities to restore our planet through sustainable actions, one step at a time.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-bold text-green-800 mb-2 border-b border-green-400 pb-1 inline-block">Quick Links</h3>
        <ul className="space-y-1 mt-1 text-green-700">
          {["Home", "About Us", "Our Projects", "Join Events", "Blog", "Partners"].map((item, idx) => (
            <li key={idx}>
              <a
                href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="hover:text-green-900 font-medium transition duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact & Social */}
      <div>
        <h3 className="font-bold text-green-800 mb-2 border-b border-green-400 pb-1 inline-block">Contact</h3>
        <ul className="text-green-700 space-y-1 mb-3">
          <li className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span>New Delhi, India</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-green-600" />
            <span>support@reearth.org</span>
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-600" />
            <span>+91-9876543210</span>
          </li>
        </ul>
        <div className="flex gap-3 text-lg text-green-700 justify-center md:justify-start">
          <FaInstagram className="hover:text-green-900 transition" />
          <FaTwitter className="hover:text-green-900 transition" />
          <FaLinkedin className="hover:text-green-900 transition" />
          <FaFacebookF className="hover:text-green-900 transition" />
          <FaYoutube className="hover:text-green-900 transition" />
        </div>
      </div>
    </div>

    <hr className="my-4 border-green-300" />

    <p className="text-center text-xs text-green-700">
      &copy; {new Date().getFullYear()} ReEarth. All rights reserved.
    </p>
  </div>
</footer>

    </div>
  );
};

export default Footer;
