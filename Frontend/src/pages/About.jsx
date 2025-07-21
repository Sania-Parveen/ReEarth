import React from 'react';
import project1 from '../assets/project1.jpg';
import { FaGlobeAmericas, FaHandsHelping, FaRecycle, FaUsers, FaChartLine } from 'react-icons/fa'; // Icons for visual appeal

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-3xl shadow-lg">
          <h1 className="text-5xl font-extrabold text-green-800 mb-6 leading-tight">
            About <span className="text-green-600">ReEarth</span>: Restoring Our Planet, Together
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At ReEarth, we believe in the power of collective action to create a cleaner, healthier, and more sustainable world. We are a passionate community dedicated to environmental restoration and fostering a culture of responsibility.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center bg-white p-8 rounded-3xl shadow-lg">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-green-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to empower individuals and communities to actively participate in environmental conservation. We organize cleanup drives, promote sustainable practices, and educate on the importance of recycling and waste reduction to re-earth our planet for future generations.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={project1}
              alt="Our Mission"
              className="w-full h-auto rounded-2xl shadow-md object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Image+Error"; }}
            />
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <FaGlobeAmericas className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Community Cleanups</h3>
              <p className="text-gray-600">
                Organizing regular cleanup drives in parks, beaches, rivers, and public spaces to remove waste and restore natural beauty.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <FaRecycle className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Promoting Recycling</h3>
              <p className="text-gray-600">
                Educating and facilitating proper waste segregation and recycling practices to minimize landfill waste.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <FaHandsHelping className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Environmental Education</h3>
              <p className="text-gray-600">
                Conducting workshops and awareness campaigns to foster environmental consciousness among all age groups.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact Section (using your existing numbers) */}
        <section className="mb-16 bg-green-700 text-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-10">Our Impact So Far</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaChartLine className="text-5xl text-green-300 mb-3" />
              <p className="text-5xl font-extrabold">30+</p>
              <p className="text-lg text-green-200">Cleanups</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-5xl text-green-300 mb-3" />
              <p className="text-5xl font-extrabold">500+</p>
              <p className="text-lg text-green-200">Volunteers</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGlobeAmericas className="text-5xl text-green-300 mb-3" />
              <p className="text-5xl font-extrabold">20+</p>
              <p className="text-lg text-green-200">Cities Covered</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRecycle className="text-5xl text-green-300 mb-3" />
              <p className="text-5xl font-extrabold">1000kg+</p>
              <p className="text-lg text-green-200">Waste Collected</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center bg-white p-10 rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Join the ReEarth Movement!</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Every hand makes a difference. Whether you want to volunteer, partner with us, or simply learn more, your support helps us create a greener tomorrow.
          </p>
          <a
            href="/events" // Link to your events page
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Get Involved Today
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
