import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { logoutUser } from "../redux/reducers/userReducer";
import toast from "react-hot-toast";
import { RiLogoutCircleLine, RiAddCircleLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout successfully");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-800 text-white fixed top-0 w-full z-10">
      {/* <nav className="bg-gray-800 text-white"> */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold">
                Just <span className="text-orange-400">Share</span>
              </h1>
            </Link>
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* avatar */}
              <img
                src={user?.avatar?.url}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <Link to="/user" className="hover:text-gray-300 text-white">
                {user?.name}
              </Link>
              <Link
                to="/login"
                className="hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </Link>
              <Link to="/form" className="hover:text-gray-300">
                Create Post
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </div>
          )}

          {/* <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
          */}

          <div className="md:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-4 py-5">
              {user ? (
                <>
                  <li>
                    <div className="flex justify-start items-center gap-6">
                      <img
                        src={user?.avatar?.url}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <Link
                        to="/user"
                        className="hover:text-gray-300 text-white font-semibold text-xl"
                      >
                        {user?.name}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-orange-300 flex justify-start items-center gap-2"
                      onClick={handleLogout}
                    >
                      <span className="font-semibold text-[15px]">Logout</span>
                      <span>
                        {" "}
                        <RiLogoutCircleLine
                          size={20}
                          className="text-green-400"
                        />{" "}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/form"
                      className="hover:text-orange-300 flex justify-start items-center gap-2"
                    >
                      <span className="text-[15px] font-semibold">
                        Create Post
                      </span>
                      <span>
                        <RiAddCircleLine size={20} className="text-green-400" />
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-gray-300">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-gray-300">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
