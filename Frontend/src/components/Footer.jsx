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
    <footer className="bg-[#DFF6E4] text-[#045D39] py-6 mt-auto shadow-inner rounded-t-2xl text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

          {/* Brand & Mission */}
          <div>
            <div className="flex items-center mb-3">
              <RiLeafFill className="text-2xl text-[#049F60] mr-2" />
              <h2 className="text-xl font-bold text-[#014425]">ReEarth</h2>
            </div>
            <p className="text-sm text-[#045D39] max-w-md leading-relaxed">
              Empowering communities to restore our planet through sustainable actions, one step at a time.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-[#014425] mb-2 text-base border-b border-[#aee4c5] pb-1">
              Get in Touch
            </h3>
            <ul className="text-[#045D39] space-y-2">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#049F60] mt-0.5" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-start gap-2">
                <FaEnvelope className="text-[#049F60] mt-0.5" />
                <span>support@reearth.org</span>
              </li>
              <li className="flex items-start gap-2">
                <FaPhoneAlt className="text-[#049F60] mt-0.5" />
                <span>+91-9876543210</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-semibold text-[#014425] mb-2 text-base border-b border-[#aee4c5] pb-1">
              Connect With Us
            </h3>
            <div className="flex gap-3 text-lg text-[#045D39]">
              <a href="#" aria-label="Instagram" className="hover:text-[#012e1b] transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#012e1b] transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#012e1b] transition">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[#012e1b] transition">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-[#012e1b] transition">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-[#b9e9cc]" />

        {/* Footer Bottom */}
        <div className="text-center text-[#045D39] text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} ReEarth. All rights reserved.</p>
          <p className="mt-0.5">
            Developed by{" "}
            <span className="font-semibold text-[#014425]">Sania Parveen, Sakshi, Sanjana</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
