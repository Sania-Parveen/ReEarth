import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold mb-4">Past Projects</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img src={project1} alt="Project 1" className="rounded shadow cursor-pointer" />
        <img src={project2} alt="Project 2" className="rounded shadow cursor-pointer" />
        <img src={project3} alt="Project 3" className="rounded shadow cursor-pointer" />
        
      </div>
    </div>
  );
};

export default Home;
