import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-700 py-8 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-700">ReEarth</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us in restoring Earth, one cleanup at a time. Recycle. Reuse. ReEarth 🌍
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-green-600">Home</a></li>
              <li><a href="#" className="hover:text-green-600">About</a></li>
              <li><a href="#" className="hover:text-green-600">Projects</a></li>
              <li><a href="#" className="hover:text-green-600">Join</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">
              📍 New Delhi, India <br />
              📧 support@reearth.org <br />
              📞 +91-9876543210
            </p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-green-600" aria-label="Instagram">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="hover:text-green-600" aria-label="Twitter">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="hover:text-green-600" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ReEarth. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
