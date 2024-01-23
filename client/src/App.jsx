import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./compoents/Navbar";
import ServicePage from "./compoents/service/ServicePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/PageNotFound";
import UserProfile from "./compoents/user/UserProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import PostForm from "./pages/post/PostForm";
import SinglePost from "./pages/post/SinglePost";
import SeeProfile from "./compoents/profile/SeeProfile";
import ViewPost from "./compoents/profile/ViewPost";
import Loader from "./utils/Loader";
import SchedulingForm from "./compoents/user/schedulePost/SchedulingForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RandomPosts from "./compoents/otherUser/RandomPosts";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <Loader />
        // <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-100 flex justify-center items-center z-50">
        //   <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        // </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>


        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<RandomPosts />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route path="/user/post/:postId" element={<SinglePost />} />
        <Route path="/user/profile/:userId" element={<SeeProfile />} />
        <Route path="/user/profile/post/:postId" element={<ViewPost />} />
        <Route path="/scheduling-form" element={<SchedulingForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
