const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen fixed bg-gray-100 border-r p-5">
      <h1 className="text-xl font-bold mb-6">ReEarth</h1>
      <nav className="flex flex-col gap-4 text-left">
        <button>@Profile</button>
        <button>Home</button>
        <button>Blog</button>
        <button>About</button>
        <button>Projects</button>
        <button className="bg-green-600 text-white rounded px-3 py-1 mt-4 hover:bg-green-700">
          Join
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
