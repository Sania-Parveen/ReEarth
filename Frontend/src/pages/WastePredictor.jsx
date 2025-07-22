import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define waste types with their labels, colors, icons, disposal instructions,
// reusable flag, environmental impact metrics (simulated), and recycling methods
// Adjusted colors to be vibrant and complement the new light green/off-white theme
const wasteTypes = {
  battery: {
    label: 'Battery',
    color: 'text-orange-600',
    icon: '🔋',
    disposal: 'E-WASTE DROP-OFF',
    reusable: false,
    co2_saved_kg: 0.05,
    energy_saved_kwh: 0.03,
    avg_weight_g: 50,
    recycling_methods: 'Batteries contain hazardous materials and valuable metals. They are collected and processed in specialized facilities to recover materials and neutralize harmful substances.'
  },
  biological: {
    label: 'Biological Waste',
    color: 'text-lime-600',
    icon: '🦠',
    disposal: 'COMPOST BIN',
    reusable: false,
    co2_saved_kg: 0.02,
    energy_saved_kwh: 0.01,
    avg_weight_g: 150,
    recycling_methods: 'Composted through natural decomposition, often in industrial facilities or home compost bins. The resulting compost enriches soil and reduces methane emissions from landfills.'
  },
  cardboard: {
    label: 'Cardboard',
    color: 'text-yellow-600',
    icon: '📦',
    disposal: 'PAPER RECYCLING',
    reusable: true,
    co2_saved_kg: 0.12,
    energy_saved_kwh: 0.08,
    avg_weight_g: 100,
    recycling_methods: 'Similar to paper, cardboard is pulped, cleaned, and then reformed into new cardboard boxes or other paper products. It\'s highly recyclable and reduces the need for new timber.'
  },
  clothes: {
    label: 'Clothes',
    color: 'text-fuchsia-600',
    icon: '👕',
    disposal: 'TEXTILE RECYCLING / DONATE',
    reusable: true,
    co2_saved_kg: 0.3,
    energy_saved_kwh: 0.2,
    avg_weight_g: 300,
    recycling_methods: 'Reusable clothes can be donated. Unwearable textiles are often shredded and used for insulation, wiping rags, or reprocessed into new fibers for various products.'
  },
  glass: {
    label: 'Glass',
    color: 'text-sky-600',
    icon: '🍾',
    disposal: 'GLASS RECYCLING',
    reusable: true,
    co2_saved_kg: 0.06,
    energy_saved_kwh: 0.03,
    avg_weight_g: 250,
    recycling_methods: 'Sorted by color, crushed into cullet, cleaned, and then melted in furnaces to create new glass bottles, jars, or fiberglass. Glass can be recycled endlessly without loss of quality.'
  },
  metal: {
    label: 'Metal',
    color: 'text-blue-400',
    icon: '�',
    disposal: 'METAL RECYCLING',
    reusable: true,
    co2_saved_kg: 0.4,
    energy_saved_kwh: 0.25,
    avg_weight_g: 100,
    recycling_methods: 'Metals like aluminum and steel are highly recyclable. They are melted down and reformed into new products, saving significant energy and raw materials compared to producing from virgin ores.'
  },
  paper: {
    label: 'Paper',
    color: 'text-red-600',
    icon: '📄',
    disposal: 'PAPER RECYCLING',
    reusable: false,
    co2_saved_kg: 0.1,
    energy_saved_kwh: 0.07,
    avg_weight_g: 50,
    recycling_methods: 'Sorted, pulped with water, cleaned to remove impurities, and then pressed and dried to form new paper products like cardboard boxes, newspapers, or tissue paper.'
  },
  plastic: {
    label: 'Plastic',
    color: 'text-emerald-600',
    icon: '♻️',
    disposal: 'RECYCLING BIN',
    reusable: true,
    co2_saved_kg: 0.08,
    energy_saved_kwh: 0.05,
    avg_weight_g: 20,
    recycling_methods: 'Typically collected, sorted by type (PET, HDPE), cleaned, shredded into flakes, melted, and then formed into new plastic products like bottles, fibers, or containers.'
  },
  shoes: {
    label: 'Shoes',
    color: 'text-amber-800',
    icon: '👟',
    disposal: 'TEXTILE RECYCLING / DONATE',
    reusable: true,
    co2_saved_kg: 0.25,
    energy_saved_kwh: 0.15,
    avg_weight_g: 400,
    recycling_methods: 'Depending on condition, shoes can be donated for reuse. Worn-out shoes can be recycled for their rubber, foam, and fabric components, often used in playground surfaces or new footwear.'
  },
  trash: {
    label: 'Trash',
    color: 'text-gray-600',
    icon: '🗑️',
    disposal: 'GENERAL WASTE',
    reusable: false,
    co2_saved_kg: 0.01,
    energy_saved_kwh: 0.005,
    avg_weight_g: 100,
    recycling_methods: 'Typically sent to landfills or incinerated. Proper disposal is crucial to minimize environmental impact, though it offers fewer resource recovery benefits compared to recycling or composting.'
  },
};

function WastePredictor() {
  const [scanning, setScanning] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null); // { type: 'plastic', confidence: 0.98 }
  const [reuseIdeas, setReuseIdeas] = useState([]);
  const [showReuseModal, setShowReuseModal] = useState(false);
  const [llmLoading, setLlmLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [reportLlmLoading, setReportLlmLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [wasteWeight, setWasteWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Stores dataURL for display
  const [selectedFile, setSelectedFile] = useState(null); // Stores the actual File object for upload
  const [useCamera, setUseCamera] = useState(false);
  const fileInputRef = useRef(null);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [tipsLoading, setTipsLoading] = useState(false);
  const [reductionTips, setReductionTips] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

  // Function to capture a screenshot from the webcam (now simulated)
  const capture = useCallback(() => {
    // In a real application, this would capture from webcamRef.current
    // For now, we'll simulate a captured image or keep selectedImage if it exists
    if (!selectedImage) {
        // Simulate a placeholder image if nothing is selected
        setSelectedImage("https://placehold.co/600x400/000000/FFFFFF?text=Simulated+Capture");
        // For simulated capture, we don't have a real File object, so we'll set selectedFile to null
        setSelectedFile(null);
    }
    setDetectionResult(null);
    setReuseIdeas([]);
    setShowReuseModal(false);
    setShowDetailsModal(false);
    setShowReportModal(false);
    setShowTipsModal(false);
    setUseCamera(false);
    setErrorMessage(''); // Clear errors on new capture
  }, [selectedImage]);

  // Handler for the "Start Scan" button click - NOW INTEGRATED WITH FLASK
  const handleScanClick = async () => {
    if (!selectedFile && !selectedImage) { // Ensure an image is selected/captured
      setErrorMessage("Please capture an image or choose a file to scan!");
      return;
    }

    setScanning(true);
    setDetectionResult(null); // Clear previous results
    setReuseIdeas([]);
    setShowReuseModal(false);
    setShowDetailsModal(false);
    setShowReportModal(false);
    setShowTipsModal(false);
    setErrorMessage(''); // Clear previous errors

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (selectedImage) {
        // If only a dataURL exists (e.g., from simulated capture), convert it to a Blob
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('image', blob, 'simulated_image.png'); // Provide a filename
      } else {
        setErrorMessage("No image data available for scanning.");
        setScanning(false);
        return;
      }

      // Replace with your Flask API endpoint
      const flaskApiUrl = 'http://127.0.0.1:5000/predict'; // Adjust if your Flask app runs on a different host/port

      const response = await fetch(flaskApiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Flask prediction result:", result);

      // Parse confidence from string "XX.XX%" to float
      const confidenceValue = parseFloat(result.confidence.replace('%', ''));

      // --- FIX APPLIED HERE ---
      // Directly use the lowercase version of the predicted class from Flask as the key
      const detectedWasteTypeKey = result.class.toLowerCase();

      if (wasteTypes[detectedWasteTypeKey]) { // Check if the key exists in our wasteTypes object
        const detectedItem = {
          id: Date.now(),
          type: detectedWasteTypeKey, // Use the key from our wasteTypes object
          confidence: confidenceValue / 100, // Convert percentage back to 0-1 range
          timestamp: new Date().toLocaleString(),
          weight_g: wasteWeight !== '' ? parseFloat(wasteWeight) :
                      (wasteTypes[detectedWasteTypeKey].avg_weight_g * (0.8 + Math.random() * 0.4)).toFixed(0),
          location: location || 'Unspecified Location'
        };
        setDetectionResult(detectedItem);
        setDetectedItems(prevItems => [...prevItems, detectedItem]);
      } else {
        // Fallback if the predicted class from Flask doesn't have a direct entry in wasteTypes
        setErrorMessage(`Unknown waste type detected: "${result.class}". Please ensure your Flask class labels match the keys in frontend's wasteTypes object.`);
        setDetectionResult({
          id: Date.now(),
          type: 'trash', // Fallback to 'trash'
          confidence: confidenceValue / 100,
          timestamp: new Date().toLocaleString(),
          weight_g: wasteWeight !== '' ? parseFloat(wasteWeight) : wasteTypes['trash'].avg_weight_g,
          location: location || 'Unspecified Location'
        });
        setDetectedItems(prevItems => [...prevItems, { ...detectionResult, type: 'trash' }]);
      }

    } catch (error) {
      console.error("Error during prediction:", error);
      setErrorMessage(`Prediction failed: ${error.message}. Please ensure your Flask server is running and accessible.`);
      setDetectionResult(null); // Clear any partial results on error
    } finally {
      setScanning(false);
    }
  };

  // Handler for file input change
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the actual File object
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set the image URL for display
        setDetectionResult(null);
        setReuseIdeas([]);
        setShowReuseModal(false);
        setShowDetailsModal(false);
        setShowReportModal(false);
        setShowTipsModal(false);
        setErrorMessage(''); // Clear errors on new upload
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setSelectedImage(null);
      setErrorMessage('');
    }
  };

  // Get the information for the currently detected waste type
  const currentWasteInfo = detectionResult ? wasteTypes[detectionResult.type] : null;

  // Function to call Gemini API for reuse ideas
  const generateReuseIdeas = async () => {
    if (!currentWasteInfo) return;

    setLlmLoading(true);
    setReuseIdeas([]); // Clear previous ideas
    setShowReuseModal(true); // Open modal to show loading state
    setShowDetailsModal(false); // Close details modal if open
    setShowReportModal(false); // Close report modal if open
    setShowTipsModal(false); // Close tips modal

    const prompt = `Give me 3-5 creative and practical ideas for reusing a ${currentWasteInfo.label}. Provide short, actionable suggestions.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will automatically provide the API key at runtime

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        // Simple parsing: split by newline or hyphen for list items
        const ideas = text.split('\n').filter(line => line.trim() !== '' && (line.includes('-') || line.includes('*'))).map(line => line.replace(/^-?\s*(\*?\s*)?/, '').trim());
        setReuseIdeas(ideas);
      } else {
        setReuseIdeas(["Could not generate ideas. Please try again."]);
      }
    } catch (error) {
      console.error("Error generating reuse ideas:", error);
      // Enhanced error message: check if error has a message, otherwise stringify the whole object
      const errorDetail = error instanceof Error ? error.message : JSON.stringify(error);
      setReuseIdeas([`Failed to generate ideas: ${errorDetail}. Please try again.`]);
    } finally {
      setLlmLoading(false);
    }
  };

  // Function to call Gemini API for waste reduction tips
  const generateWasteReductionTips = async () => {
    if (!currentWasteInfo) return;

    setTipsLoading(true);
    setReductionTips([]); // Clear previous tips
    setShowTipsModal(true); // Open modal to show loading state
    setShowReuseModal(false); // Close other modals
    setShowDetailsModal(false);
    setShowReportModal(false);

    const prompt = `Give me 3-5 practical and actionable tips to reduce the creation of ${currentWasteInfo.label} in daily life. Focus on simple, effective habits.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will automatically provide the API key at runtime

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        const tips = text.split('\n').filter(line => line.trim() !== '' && (line.includes('-') || line.includes('*'))).map(line => line.replace(/^-?\s*(\*?\s*)?/, '').trim());
        setReductionTips(tips);
      } else {
        setReductionTips(["Could not generate tips. Please try again."]);
      }
    } catch (error) {
      console.error("Error generating waste reduction tips:", error);
      // Enhanced error message: check if error has a message, otherwise stringify the whole object
      const errorDetail = error instanceof Error ? error.message : JSON.stringify(error);
      setReductionTips([`Failed to generate tips: ${errorDetail}. Please try again.`]);
    } finally {
      setTipsLoading(false);
    }
  };

  // Function to open the details modal
  const openDetailsModal = () => {
    setShowDetailsModal(true);
    setShowReuseModal(false); // Close reuse modal if open
    setShowReportModal(false); // Close report modal if open
    setShowTipsModal(false); // Close tips modal
  };

  // Function to generate and display the report
  const generateReport = async () => {
    setShowReportModal(true);
    setReportLlmLoading(true);
    setReportMessage(''); // Clear previous message
    setShowReuseModal(false); // Close other modals
    setShowDetailsModal(false);
    setShowTipsModal(false); // Close tips modal

    // Calculate report summary
    const totalItems = detectedItems.length;
    const totalWeight = detectedItems.reduce((sum, item) => sum + parseFloat(item.weight_g), 0);
    const typeCounts = detectedItems.reduce((counts, item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
      return counts;
    }, {});

    const locationCounts = detectedItems.reduce((counts, item) => {
      counts[item.location] = (counts[item.location] || 0) + 1;
      return counts;
    }, {});

    let reportPrompt = `Generate a short, encouraging, and beautiful summary for a waste classification report. The user has classified ${totalItems} items today, with a total weight of ${totalWeight.toFixed(2)} grams.`;
    reportPrompt += ` They classified the following types: ${Object.entries(typeCounts).map(([type, count]) => `${count} ${wasteTypes[type].label}(s)`).join(', ')}.`;
    if (Object.keys(locationCounts).length > 0) {
      reportPrompt += ` Items were classified from locations such as: ${Object.entries(locationCounts).map(([loc, count]) => `${count} from ${loc}`).join(', ')}.`;
    }
    reportPrompt += ` Focus on their positive environmental impact and encourage continued effort.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        setReportMessage(result.candidates[0].content.parts[0].text);
      } else {
        setReportMessage("Could not generate report summary. Please try again.");
      }
    } catch (error) {
      console.error("Error generating report summary:", error);
      // Enhanced error message: check if error has a message, otherwise stringify the whole object
      const errorDetail = error instanceof Error ? error.message : JSON.stringify(error);
      setReportMessage(`Failed to generate report summary: ${errorDetail}. Please try again.`);
    } finally {
      setReportLlmLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-gray-800 flex flex-col lg:flex-row items-center justify-center overflow-hidden font-inter p-4"
         style={{ backgroundColor: '#fdf5e6' /* oldlace */ }}>
      {/*
        Inline CSS for custom keyframe animations.
        In a real project, these would typically be in your global CSS file (e.g., index.css)
        or managed by a CSS-in-JS library.
      */}
      <style>
        {`
          @keyframes pulse-border {
            0%, 100% {
              border-color: #86efac; /* green-300 */
              box-shadow: 0 0 15px #86efac;
            }
            50% {
              border-color: #4ade80; /* green-400 */
              box_shadow: 0 0 30px #4ade80;
            }
          }

          .animate-pulse-border {
            animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }

          @keyframes scan-line {
            0% { transform: translateY(-100%); opacity: 0.1; }
            50% { opacity: 0.7; }
            100% { transform: translateY(100%); opacity: 0.1; }
          }

          .animate-scan-line {
            animation: scan-line 3s infinite alternate;
          }

          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }

          @keyframes bounce-in-icon {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }

          .animate-bounce-in-icon {
            animation: bounce-in-icon 0.6s ease-out forwards;
          }

          @keyframes pulse-btn {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); /* green-400 */
            }
            50% {
              box-shadow: 0 0 0 15px rgba(74, 222, 128, 0);
            }
          }

          .animate-pulse-btn {
            animation: pulse-btn 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes modal-fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-modal-fade-in {
            animation: modal-fade-in 0.3s ease-out forwards;
          }

          /* Custom scrollbar for report modal */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #dcfce7; /* green-100 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4ade80; /* green-400 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #22c55e; /* green-500 on hover */
          }
        `}
      </style>

      {/* --- Left Side: Scanning and File Selection --- */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen p-4 bg-white/70 lg:bg-transparent rounded-xl lg:rounded-none shadow-lg lg:shadow-none">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:mt-0 mt-8">Waste Scanner</h2>

        {/* --- Camera/Image Display Area --- */}
        <div className="relative w-full max-w-sm h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-white shadow-xl flex items-center justify-center border-4 border-green-300 mb-6 animate-pulse-border">
          {useCamera ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 text-lg md:text-xl animate-pulse">Simulated Camera Feed</p>
            </div>
          ) : selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected waste item"
              className="w-full h-full object-cover filter brightness-90"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-lg md:text-xl animate-pulse">Upload image or use camera</p>
            </div>
          )}

          {/* Scanning Overlay */}
          {scanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
              <div className="w-full h-1 bg-green-400 opacity-70 absolute animate-scan-line"></div>
              <p className="text-white text-lg md:text-xl font-mono tracking-wider animate-pulse">SCANNING...</p>
            </div>
          )}
        </div>

        {/* --- Camera/File Input Toggle & Actions --- */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => { setUseCamera(true); setSelectedImage(null); setSelectedFile(null); setDetectionResult(null); setErrorMessage(''); }}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${useCamera ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800 hover:bg-green-300'}`}
            >
              📷 Use Camera (Simulated)
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => { setUseCamera(false); fileInputRef.current.click(); }}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${!useCamera && selectedImage === null ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800 hover:bg-green-300'}`}
            >
              📂 Choose File
            </button>
          </div>

          {useCamera && (
            <button
              onClick={capture}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md transition-colors transform hover:scale-105 active:scale-95"
            >
              📸 Capture Photo (Simulated)
            </button>
          )}

          {(selectedImage || selectedFile) && !useCamera && (
            <button
              onClick={() => { setSelectedImage(null); setSelectedFile(null); setDetectionResult(null); setErrorMessage(''); }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition-colors transform hover:scale-105 active:scale-95 text-sm"
            >
              Clear Image
            </button>
          )}
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-center w-full max-w-sm animate-fade-in border border-red-300">
            {errorMessage}
          </div>
        )}

        {/* START SCAN Button */}
        {!scanning && !detectionResult && (
          <button
            onClick={handleScanClick}
            className={`px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl md:text-2xl rounded-full shadow-xl transform transition-all duration-300 ease-in-out
              hover:scale-105 active:scale-95 animate-pulse-btn
              ${(!selectedImage && !selectedFile) ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'}`}
            disabled={!selectedImage && !selectedFile}
          >
            START SCAN
          </button>
        )}
      </div>

      {/* --- Right Side: User Input and Results --- */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen p-4 bg-green-200 backdrop-blur-sm lg:rounded-l-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:mt-0 mt-8">Waste Details & Results</h2>

        {/* --- User Input Section --- */}
        <div className="w-full max-w-sm mb-6 bg-[#ffe4e1] shadow-lg p-5 rounded-xl border border-pink-300 text-gray-800">
          <h3 className="text-xl font-semibold mb-3">Your Input:</h3>
          {/* Location Input */}
          <div className="mb-3">
            <label htmlFor="wasteLocation" className="block text-base font-semibold mb-1">Location:</label>
            <input
              type="text"
              id="wasteLocation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Kitchen, Park"
              className="w-full p-2 rounded-lg bg-red-50 text-gray-800 placeholder-red-400 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all text-base border border-red-100"
            />
          </div>

          {/* Weight Input */}
          <div>
            <label htmlFor="wasteWeight" className="block text-base font-semibold mb-1">Weight (grams):</label>
            <input
              type="number"
              id="wasteWeight"
              value={wasteWeight}
              onChange={(e) => setWasteWeight(e.target.value)}
              placeholder="e.g., 200"
              min="0"
              className="w-full p-2 rounded-lg bg-red-50 text-gray-800 placeholder-red-400 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all text-base border border-red-100"
            />
          </div>
        </div>

        {/* --- Detection Result Display --- */}
        {detectionResult && currentWasteInfo && (
          <div
            className={`p-6 rounded-xl shadow-2xl border-2 ${currentWasteInfo.color.replace('text-', 'border-')}
              flex flex-col items-center text-center animate-fade-in transition-all duration-500 ease-out max-w-sm w-full mb-6`}
            style={{ backgroundColor: '#fff0f5' /* lavenderblush */ }}
          >
            {/* Waste type icon */}
            <div className={`text-5xl mb-3 animate-bounce-in-icon ${currentWasteInfo.color}`}>
              {currentWasteInfo.icon}
            </div>
            {/* Classified label */}
            <p className={`text-3xl md:text-4xl font-extrabold ${currentWasteInfo.color} mb-2`}>
              {currentWasteInfo.label}
            </p>
            {/* Confidence level */}
            <p className="text-gray-700 text-lg mb-4">
              Confidence: <span className="font-semibold">{Math.round(detectionResult.confidence * 100)}%</span>
            </p>
            {/* Disposal instruction */}
            <p className="text-2xl text-gray-800">
              Dispose in: <span className="font-bold text-green-500">{currentWasteInfo.disposal}</span>
            </p>

            {/* Environmental Impact Metrics */}
            <div className="mt-4 text-gray-700 text-base md:text-lg">
                <p>🌍 Saved: <span className="font-semibold">{currentWasteInfo.co2_saved_kg.toFixed(2)} kg CO2</span></p>
                <p>⚡ Saved: <span className="font-semibold">{currentWasteInfo.energy_saved_kwh.toFixed(2)} kWh Energy</span></p>
                <p>⚖️ Weight: <span className="font-semibold">{detectionResult.weight_g} g</span></p>
                <p>📍 Location: <span className="font-semibold">{detectionResult.location}</span></p>
            </div>

            {/* Local Recycling Info (Simulated) */}
            <div className="mt-4 text-gray-700 text-sm md:text-base text-center">
                <p className="font-semibold text-gray-800 mb-1">Local Guidelines:</p>
                <p>Check your local municipality's website for specific collection schedules and accepted materials.</p>
                <p className="text-green-600 cursor-pointer hover:underline mt-1">Find nearest drop-off points</p>
            </div>

            {/* Details & Impact Button */}
            <button
              onClick={openDetailsModal}
              className="mt-6 px-7 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95"
            >
              Details & Impact
            </button>

            {/* ✨ Reuse Ideas Button (Gemini API Integration) */}
            {currentWasteInfo.reusable && (
              <button
                onClick={generateReuseIdeas}
                className="mt-4 px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 flex items-center justify-center"
                disabled={llmLoading}
              >
                {llmLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "✨ Reuse Ideas"
                )}
              </button>
            )}

            {/* ✨ Waste Reduction Tips Button (Gemini API Integration) */}
            <button
              onClick={generateWasteReductionTips}
              className="mt-4 px-7 py-3 bg-lime-500 hover:bg-lime-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 flex items-center justify-center"
              disabled={tipsLoading}
            >
              {tipsLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "✨ Waste Reduction Tips"
              )}
            </button>
          </div>
        )}

        {/* --- Action Buttons (Relocated) --- */}
        <div className="flex flex-col items-center space-y-4 mt-auto w-full max-w-sm">
          {!scanning && detectedItems.length > 0 && (
            <>
              <button
                onClick={() => {
                  setDetectionResult(null); // Clear result
                  setSelectedImage(null); // Clear image
                  setSelectedFile(null); // Clear file
                  setLocation(''); // Clear location
                  setWasteWeight(''); // Clear weight
                  setUseCamera(false); // Ensure camera is off
                  setErrorMessage(''); // Clear errors
                }}
                className="px-10 py-4 font-semibold rounded-full shadow-lg transition-colors transform hover:scale-105 active:scale-95 w-full"
                style={{ backgroundColor: '#e6e6fa', color: '#6a5acd' /* a darker lavender for text */ }}
              >
                Scan New Item
              </button>
              <button
                onClick={generateReport}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-xl rounded-full shadow-lg transition-colors transform hover:scale-105 active:scale-95 w-full"
              >
                📊 Generate Report
              </button>
            </>
          )}
        </div>
      </div>


      {/* --- Reuse Ideas Modal --- */}
      {showReuseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-modal-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border border-green-300 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              ✨ Reuse Ideas for {currentWasteInfo?.label}
            </h2>
            {llmLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-700 text-lg">Generating creative ideas...</p>
              </div>
            ) : (
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                {reuseIdeas.length > 0 ? (
                  reuseIdeas.map((idea, index) => (
                    <li key={index} className="text-lg leading-relaxed">
                      {idea}
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg py-4">No ideas generated. Please try again.</p>
                )}
              </ul>
            )}
            <button
              onClick={() => setShowReuseModal(false)}
              className="mt-8 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Details & Impact Modal --- */}
      {showDetailsModal && currentWasteInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-modal-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border border-green-300 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Details for {currentWasteInfo?.label}
            </h2>

            {/* Added max-h and overflow-y-auto to this div for scrolling */}
            <div className="space-y-4 text-gray-700 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Disposal Summary:</h3>
                <p className="text-lg">This item should be placed in the <span className="font-bold text-green-500">{currentWasteInfo.disposal}</span>.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Environmental Impact:</h3>
                <p className="text-lg">By properly disposing of this item, you help save approximately:</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li><span className="font-bold">{currentWasteInfo.co2_saved_kg.toFixed(2)} kg of CO2 emissions</span> (equivalent to driving a car for X miles).</li>
                  <li><span className="font-bold">{currentWasteInfo.energy_saved_kwh.toFixed(2)} kWh of energy</span> (enough to power a lightbulb for Y hours).</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Local Recycling Information:</h3>
                <p className="text-lg">Specific guidelines can vary by location. Please refer to your local waste management authority for precise instructions.</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li><span className="font-bold">Preparation:</span> {currentWasteInfo.label.includes('Bottle') || currentWasteInfo.label.includes('Jar') ? 'Rinse thoroughly and remove caps/lids.' : 'Ensure item is clean and dry.'}</li>
                  <li><span className="font-bold">Collection:</span> Check your municipal website for curbside pickup schedules.</li>
                  <li><span className="font-bold">Drop-off:</span> Find nearby recycling centers that accept {currentWasteInfo.label}s. <a href="#" className="text-green-600 hover:underline">Search local drop-off points</a></li>
                </ul>
              </div>

              {/* Recycling Methods Section */}
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Recycling Methods:</h3>
                <p className="text-lg leading-relaxed">{currentWasteInfo.recycling_methods}</p>
              </div>

              {currentWasteInfo.reusable && (
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Reuse Potential:</h3>
                  <p className="text-lg">This item has great potential for creative reuse! Click the "✨ Reuse Ideas" button on the main screen for suggestions.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-8 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Waste Reduction Tips Modal --- */}
      {showTipsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-modal-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border border-green-300 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              ✨ Reduce {currentWasteInfo?.label} Waste
            </h2>
            {tipsLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-700 text-lg">Generating reduction tips...</p>
              </div>
            ) : (
              <ul className="list-disc list-inside text-gray-700 space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {reductionTips.length > 0 ? (
                  reductionTips.map((tip, index) => (
                    <li key={index} className="text-lg leading-relaxed">
                      {tip}
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg py-4">No tips generated. Please try again.</p>
                )}
              </ul>
            )}
            <button
              onClick={() => setShowTipsModal(false)}
              className="mt-8 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Report Modal --- */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-modal-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border border-green-300 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              📊 Your Waste Classification Report
            </h2>

            {reportLlmLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-700 text-lg">Generating personalized report summary...</p>
              </div>
            ) : (
              <>
                {reportMessage && (
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {reportMessage}
                  </p>
                )}

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Detected Items:</h3>
                <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="space-y-2">
                    {detectedItems.length > 0 ? (
                      detectedItems.map((item) => (
                        <li key={item.id} className="bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm border border-gray-200">
                          <div>
                            <span className={`font-bold ${wasteTypes[item.type].color}`}>{wasteTypes[item.type].label}</span>
                            <span className="text-gray-600 ml-2">({(item.confidence * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="text-gray-600 mt-1 sm:mt-0">
                            {item.weight_g} g <span className="ml-2">📍 {item.location}</span>
                            <span className="text-gray-500 text-xs ml-2 block sm:inline">{item.timestamp}</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">No items detected yet. Scan some waste!</p>
                    )}
                  </ul>
                </div>

                <div className="mt-6 text-center text-gray-700">
                  <p className="text-lg font-semibold">Total Items Classified: <span className="text-green-600">{detectedItems.length}</span></p>
                  <p className="text-lg font-semibold">Total Weight Classified: <span className="text-green-600">{detectedItems.reduce((sum, item) => sum + parseFloat(item.weight_g), 0).toFixed(2)} g</span></p>
                </div>
              </>
            )}

            <button
              onClick={() => setShowReportModal(false)}
              className="mt-8 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-md transition-colors transform hover:scale-105 active:scale-95 w-full"
            >
              Close Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WastePredictor;