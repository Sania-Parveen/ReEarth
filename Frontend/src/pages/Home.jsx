import { useEffect, useState } from 'react';

import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';


const images = [
  { src: project1, link: '#' },
  { src: project2, link: '#' },
  { src: project3, link: '#' }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-10 px-2 sm:px-4 py-2 w-full">

      {/* Hero Section */}
      <section className="bg-green-100 rounded-xl p-6 text-center shadow">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">Welcome to ReEarth 🌍</h1>
        <p className="text-gray-700 text-base sm:text-lg">
          Join us in restoring Earth, one cleanup at a time. Recycle. Reuse. ReEarth. 💚
        </p>
        <button className="mt-4 px-5 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300">
          Join a Cleanup Drive
        </button>
      </section>

      {/* Slideshow Section */}
      <section className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <a href={images[currentIndex].link} target="_blank" rel="noopener noreferrer">
          <img
            src={images[currentIndex].src}
            alt={`Project ${currentIndex + 1}`}
            className="w-full h-64 sm:h-80 object-cover transition-all duration-1000 cursor-pointer"
          />
        </a>

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex ? 'bg-green-700' : 'bg-green-300'
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-green-700 font-semibold">
        {[
          ['30+', 'Cleanups'],
          ['500+', 'Volunteers'],
          ['20+', 'Cities Covered'],
          ['1000kg+', 'Waste Collected'],
        ].map(([value, label], idx) => (
          <div key={idx} className="bg-green-50 p-4 rounded shadow">
            <p className="text-2xl">{value}</p>
            <p>{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
