import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local assets (assuming these paths are correct in your project)
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';

// Import icons from lucide-react for a cleaner look
import { ArrowLeftCircle, ArrowRightCircle, Leaf, Users, MapPin, Recycle } from 'lucide-react';

// Define image data with captions
const images = [
  { src: project1, link: '#', caption: 'Community Cleanup Drive in Action' },
  { src: project2, link: '#', caption: 'Volunteers Planting Trees for a Greener Future' },
  { src: project3, link: '#', caption: 'Waste Segregation and Recycling Initiative' }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Increased interval for better viewing
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation for slideshow
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle click on "Join a Cleanup Drive" button
  const handleJoinClick = () => {
    navigate('/events'); // Redirect to EventPage
  };

  return (
    <div className="flex flex-col items-center gap-12 px-4 py-8 sm:px-6 lg:px-8 font-inter bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center transform transition-all duration-500 hover:scale-[1.01]">
        <div className="absolute inset-0 bg-pattern-leaf opacity-10 pointer-events-none"></div> {/* Subtle background pattern */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 drop-shadow-lg animate-fade-in-down">
          Welcome to ReEarth <span role="img" aria-label="earth">🌍</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl mb-6 max-w-3xl leading-relaxed animate-fade-in-up">
          Join us in restoring Earth, one cleanup at a time. Together, we recycle, reuse, and ReEarth our planet for a sustainable future. <span role="img" aria-label="green heart">💚</span>
        </p>
        <button
          onClick={handleJoinClick}
          className="px-6 py-3 bg-white text-green-700 font-bold text-base rounded-lg shadow-md hover:bg-green-100 hover:scale-105 transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 animate-bounce-in"
        >
          Join a Cleanup Drive
        </button>
      </section>

      {/* Slideshow Section */}
      <section className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg bg-white group">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className="w-full h-72 sm:h-96 object-cover transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-105"
        />
        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center text-lg sm:text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images[currentIndex].caption}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous image"
        >
          <ArrowLeftCircle size={32} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next image"
        >
          <ArrowRightCircle size={32} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-md cursor-pointer transition-all duration-300 ${
                idx === currentIndex ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          { value: '30+', label: 'Cleanups', icon: Leaf },
          { value: '500+', label: 'Volunteers', icon: Users },
          { value: '20+', label: 'Cities Covered', icon: MapPin },
          { value: '1000kg+', label: 'Waste Collected', icon: Recycle },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-green-100"
          >
            <stat.icon className="text-green-600 mb-3" size={48} />
            <p className="text-4xl font-bold text-green-800 mb-1">{stat.value}</p>
            <p className="text-lg text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* About Us Section */}
      <section className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          At ReEarth, we believe in the power of collective action to create a cleaner, healthier planet. Our mission is to organize and facilitate community-led cleanup drives, raise environmental awareness, and promote sustainable practices.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Every piece of litter collected, every tree planted, and every volunteer engaged brings us closer to a world where nature thrives. Join our growing community and make a tangible difference today!
        </p>
        <button
          onClick={() => navigate('/about')} // Assuming an /about route
          className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
        >
          Learn More About Us
        </button>
      </section>

      {/* Tailwind CSS custom animations (add these to your main CSS file or a style tag if not using PostCSS) */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
          animation-delay: 0.6s;
        }

        .bg-pattern-leaf {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 60L60 0H0V60zM60 60V0H0L60 60z'/%3E%3C/g%3E%3C/svg%3E");
            background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default Home;
