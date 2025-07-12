import React, { useState } from 'react';
import partners from '../data/partners';

function RecyclingPartnersPage() {
  const [selectedWaste, setSelectedWaste] = useState('');

  const filteredPartners = selectedWaste
    ? partners.filter((partner) =>
        partner.wasteTypes.includes(selectedWaste.toLowerCase())
      )
    : partners;

  return (
    <div className="min-h-screen bg-[darkslategrey] py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white">♻️ Recycling Partners</h1>
        <p className="text-gray-200 mt-2">Find organizations that turn waste into something useful</p>
      </div>

      {/* Filter */}
      <div className="max-w-2xl mx-auto mb-8 flex justify-center">
        <select
          value={selectedWaste}
          onChange={(e) => setSelectedWaste(e.target.value)}
          className="border p-2 rounded-md bg-white text-gray-800"
        >
          <option value="">All Waste Types</option>
          <option value="plastic">Plastic</option>
          <option value="paper">Paper</option>
          <option value="e-waste">E-waste</option>
          <option value="clothes">Clothes</option>
          <option value="metal">Metal</option>
          <option value="organic">Organic</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredPartners.map((partner, idx) => (
          <div
            key={idx}
            className="bg-[honeydew] rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
          >
            <img src={partner.logo} alt="logo" className="w-14 h-14 mx-auto mb-4 rounded" />
            <h3 className="text-xl font-bold text-green-800 mb-1">{partner.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{partner.description}</p>
            <p className="text-sm text-gray-600 mb-1">📍 {partner.location}</p>
            <p className="text-sm text-gray-600 mb-2">📞 {partner.phone}</p>

            {/* Waste Type Badges */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {partner.wasteTypes.map((type, i) => (
                <span key={i} className="bg-green-700 text-green-100 text-xs px-2 py-1 rounded-full">
                  {type}
                </span>
              ))}
            </div>

            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
            >
              🌐 Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecyclingPartnersPage;
