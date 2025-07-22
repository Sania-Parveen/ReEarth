// src/components/WasteProgress.jsx
// src/components/WasteProgress.jsx
const WasteProgress = () => {
  const recycled = 85;
  const total = 125;
  const percent = (recycled / total) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recycling Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">{percent.toFixed(1)}% of waste recycled</p>
    </div>
  );
};

export default WasteProgress;
