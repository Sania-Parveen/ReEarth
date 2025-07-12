import React from 'react';

function PartnerCard({ partner }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-green-700 mb-2">{partner.name}</h2>
      <p className="text-sm"><strong>📍 Location:</strong> {partner.location}</p>
      <p className="text-sm"><strong>♻️ Recycles:</strong> {partner.wasteTypes.join(', ')}</p>
      <p className="text-sm"><strong>📧 Email:</strong> <a href={`mailto:${partner.contact}`} className="text-blue-700 underline">{partner.contact}</a></p>
      <a href={partner.website} target="_blank" className="inline-block mt-3 text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">
        Visit Website
      </a>
    </div>
  );
}

export default PartnerCard;
