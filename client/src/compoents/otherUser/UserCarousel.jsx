import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Replace with your icon library

const UserCarousel = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change the duration for carousel rotation (in milliseconds)

    return () => clearInterval(interval);
  }, [profiles.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrev}>
          <AiOutlineLeft size={32} />
        </button>
        <button onClick={handleNext}>
          <AiOutlineRight size={32} />
        </button>
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-500 ease-in-out transform">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full transform ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <div className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg">
                <img
                  src={profile?.data?.imageUrl}
                  alt={profile?.data?.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p>Followers: {profile.followers}</p>
                  <p>Following: {profile.following}</p>
                  <p>Total Posts: {profile.totalPosts}</p>
                  <p>{profile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCarousel;
