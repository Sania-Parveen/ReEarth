
// import React, { useState } from 'react';

// const BlogPostCard = ({ post, onDelete }) => { // Added onDelete prop
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   const truncatedDescription = post.description.length > 150
//     ? post.description.substring(0, 150) + '...'
//     : post.description;

//   // Format the date
//   const postDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }) : 'No Date';

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative"> {/* Added relative for positioning delete button */}
//       {post.imageUrl && (
//         <div className="w-full h-48 overflow-hidden">
//           <img
//             src={post.imageUrl}
//             alt={post.title}
//             className="w-full h-full object-cover"
//             onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/cccccc/333333?text=Image+Error"; }}
//           />
//         </div>
//       )}
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
//         <p className="text-sm text-gray-600 mb-1">By: <span className="font-medium text-gray-700">{post.author}</span></p>
//         <p className="text-xs text-gray-500 mb-3">Posted on: {postDate}</p> {/* Display date */}
//         <div className="text-gray-700 text-base leading-relaxed">
//           {showFullDescription ? (
//             <p>{post.description}</p>
//           ) : (
//             <p>{truncatedDescription}</p>
//           )}
//           {post.description.length > 150 && (
//             <button
//               onClick={toggleDescription}
//               className="text-blue-600 hover:text-blue-800 font-semibold mt-2 focus:outline-none"
//             >
//               {showFullDescription ? 'Read Less' : 'Read More'}
//             </button>
//           )}
//         </div>
//       </div>
//       {onDelete && ( // Only show delete button if onDelete prop is provided
//         <button
//           onClick={() => onDelete(post.id)} // Pass post.id to onDelete handler
//           className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 text-xs opacity-80 hover:opacity-100 transition-opacity"
//           title="Delete Blog Post"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default BlogPostCard;
import React, { useState } from 'react';


const BlogPostCard = ({ post, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncationLength = 180;
  const truncatedDescription = post.description.length > truncationLength
    ? post.description.substring(0, truncationLength) + '...'
    : post.description;

  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No Date';

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-xl relative flex flex-col h-full border border-green-100">
      {post.imageUrl && (
        <div className="w-full h-52 overflow-hidden bg-green-50 flex items-center justify-center relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/400x200/D1FAE5/34D399?text=Nature+Image';
              e.target.alt = 'Image not available';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-emerald-800 mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 font-medium">
          By: <span className="text-teal-700">{post.author}</span>
        </p>
        <p className="text-xs text-gray-500 mb-4">Published on: {postDate}</p>
        <div className="text-gray-700 text-base leading-relaxed flex-grow">
          {showFullDescription ? (
            <p className="whitespace-pre-wrap">{post.description}</p>
          ) : (
            <p>{truncatedDescription}</p>
          )}
          {post.description.length > truncationLength && (
            <>
              {/* Green read more button */}
              <button
                onClick={toggleDescription}
                className="text-green-600 hover:text-green-800 font-semibold mt-3 focus:outline-none focus:ring-2 focus:ring-green-200 rounded-md px-2 py-1"
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            </>
          )}
        </div>
        {!showFullDescription && post.description.length <= truncationLength && (
          <div className="flex-grow"></div>
        )}
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(post.id)}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 text-xs opacity-90 hover:opacity-100 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
          title="Delete Blog Post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BlogPostCard;
