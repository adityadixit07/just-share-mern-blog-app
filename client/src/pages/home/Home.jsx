import { Link } from "react-router-dom";
import About from "../about/About";
import Footer from "../footer/Footer";
import ServicePage from "../../compoents/service/ServicePage";
import Typewriter from "../../layouts/Typewriter";
const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 mt-14">
      <header className="py-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 ml-3">
            Welcome to Just{" "}
            <span className="text-orange-400 border-b border-black" >Share</span>
          </h1>
          <div>
            <Typewriter
              texts={[
                "Share your thoughts",
                "Share your ideas",
                "Share your knowledge",
                "Share your experience",
                "Share your skills",
                "Share your stories",
                "Share your feelings",
                "Share your opinions",
                "Share your creations",
              ]}
            />
          </div>
        </div>
      </header>
      <main className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Explore our amazing features and services.
        </p>
        {/* navigation links */}
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/services"
                className="px-6 py-3 rounded-md bg-indigo-500 text-white font-semibold text-sm transition duration-300 hover:bg-indigo-600"
              >
                View Services
              </Link>
              <Link
                to="/user"
                className="px-6 py-3 rounded-md bg-indigo-500 text-white font-semibold text-sm transition duration-300 hover:bg-indigo-600"
              >
                User Profile
              </Link>
            </>
          ) : (
            <div className="flex justify-between gap-5 items-center ml-3">
              <Link
                to="/register"
                className="px-6 py-3 rounded-md bg-indigo-500 text-white font-semibold text-sm transition duration-300 hover:bg-indigo-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-md bg-indigo-500 text-white font-semibold text-sm transition duration-300 hover:bg-indigo-600"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </main>

      <About />
      <ServicePage />
      <Footer />
    </div>
  );
};

export default Home;
