// import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../redux/reducers/userReducer";
// import toast from "react-hot-toast";
// import { RiLogoutCircleLine, RiAddCircleLine } from "react-icons/ri";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     toast.success("Logout successfully");
//     setIsOpen(false);
//     navigate("/login");
//   };
//   return (
//     <nav className="bg-gray-800 text-white fixed top-0 w-full z-10">
//       {/* <nav className="bg-gray-800 text-white"> */}
//       <div className="max-w-7xl mx-auto px-4 ">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center">
//             <Link to={"/"}>
//               <h1 className="text-2xl font-bold">
//                 Just <span className="text-orange-400">Share</span>
//               </h1>
//             </Link>
//           </div>

//           {user ? (
//             <div className="hidden md:flex items-center space-x-4">
//               {/* avatar */}
//               <div className="relative">
//                 <img
//                   src={user?.avatar?.url}
//                   alt="avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
//               </div>
//               <Link to="/user" className="hover:text-gray-300 text-white">
//                 {user?.name}
//               </Link>
//               <Link
//                 to="/login"
//                 className="hover:text-gray-300"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Link>
//               <Link to="/form" className="hover:text-gray-300">
//                 Create Post
//               </Link>

//               <Link to="/explore" className="hover:text-gray-300">
//                 Explore
//               </Link>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="/explore" className="hover:text-gray-300">
//                 Explore
//               </Link>{" "}
//               <Link to="/login" className="hover:text-gray-300">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:text-gray-300">
//                 Register
//               </Link>
//               <Link to="/contact" className="hover:text-gray-300">
//                 Contact
//               </Link>
//             </div>
//           )}
//           <div className="md:hidden flex items-center gap-5">
//             <button>
//               {isOpen === false && user && (
//                 <div className="relative">
//                   <img
//                     src={user?.avatar?.url}
//                     alt="avatar"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
//                 </div>
//               )}
//             </button>
//             <button onClick={toggleNavbar}>
//               {isOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//         {isOpen && (
//           <div className="md:hidden">
//             <ul className="flex flex-col space-y-4 py-5">
//               {user ? (
//                 <>
//                   <li>
//                     <div className="flex justify-start items-center gap-6">
//                       <div className="relative">
//                         <img
//                           src={user?.avatar?.url}
//                           alt="avatar"
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
//                       </div>

//                       <Link
//                         to="/user"
//                         className="hover:text-gray-300 text-white font-semibold text-xl"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {user?.name}
//                       </Link>
//                     </div>
//                   </li>
//                   <li>
//                     <Link
//                       to="/login"
//                       className="hover:text-orange-300 flex justify-start items-center gap-2"
//                       onClick={handleLogout}
//                     >
//                       <span className="font-semibold text-[15px]">Logout</span>
//                       <span>
//                         {" "}
//                         <RiLogoutCircleLine
//                           size={20}
//                           className="text-green-400"
//                         />{" "}
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/form"
//                       className="hover:text-orange-300 flex justify-start items-center gap-2"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <span className="text-[15px] font-semibold">
//                         Create Post
//                       </span>
//                       <span>
//                         <RiAddCircleLine size={20} className="text-green-400" />
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/explore">
//                       <span className="text-[15px] font-semibold">Explore</span>
//                     </Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <Link
//                       to="/explore"
//                       className="hover:text-gray-300"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       Explore
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/login"
//                       className="hover:text-gray-300"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       Login
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/register"
//                       className="hover:text-gray-300"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       Register
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/contact"
//                       className="hover:text-gray-300"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       Contact
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/reducers/userReducer";
import toast from "react-hot-toast";
import { RiLogoutCircleLine, RiAddCircleLine } from "react-icons/ri";
import API from "../utils/API";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout successfully");
    setIsOpen(false);
    navigate("/login");
  };

  const handleSearch = async() => {
    try{
      const response=await API.get('/search-post/:title');
    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
    toast.success("searching......");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <nav className="bg-gray-800 text-white fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold">
                Just <span className="text-orange-400">Share</span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search any post..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="relative">
                  <img
                    src={user?.avatar?.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
                </div>
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
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <span className="text-[15px] font-semibold">Post</span>
                  </button>
                  <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-36 z-10 hidden group-hover:block">
                    <Link
                      to="/form"
                      className=" text-black hover:text-orange-300 flex justify-start items-center gap-2 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[15px] font-semibold">
                        Instant Post
                      </span>
                      <span>
                        <RiAddCircleLine size={20} className="text-green-400" />
                      </span>
                    </Link>
                    <Link
                      to="/schedule-post"
                      className="text-black hover:text-orange-300 flex justify-start items-center gap-2 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[15px] font-semibold">
                        Schedule Post
                      </span>
                      <span>
                        <RiAddCircleLine size={20} className="text-green-400" />
                      </span>
                    </Link>
                  </div>
                </div>
                <Link to="/explore" className="hover:text-gray-300">
                  Explore
                </Link>
              </>
            ) : (
              <>
                <Link to="/explore" className="hover:text-gray-300">
                  Explore
                </Link>{" "}
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-5">
            <button>
              {isOpen === false && user && (
                <div className="relative">
                  <img
                    src={user?.avatar?.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
                </div>
              )}
            </button>
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
                      <div className="relative">
                        <img
                          src={user?.avatar?.url}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border border-white"></span>
                      </div>
                      <Link
                        to="/user"
                        className="hover:text-gray-300 text-white font-semibold text-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        {user?.name}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-orange-300 flex justify-start items-center gap-2"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
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
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[15px] font-semibold">
                        Create Post
                      </span>
                      <span>
                        <RiAddCircleLine size={20} className="text-green-400" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore">
                      <span className="text-[15px] font-semibold">Explore</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/explore"
                      className="hover:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="hover:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
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
