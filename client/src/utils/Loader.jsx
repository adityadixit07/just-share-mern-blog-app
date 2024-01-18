import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading } from "../redux/reducers/alertsSlice";

const Loader = () => {
  const [quote, setQuote] = useState("");
  const dispatch = useDispatch();
  const getRandomQuote = async () => {
    try {
      const quotes = [
        "Code, conquer, repeat.",
        "Debugging is an art form.",
        "Keep coding and stay curious!",
        "Loading awesomeness...",
        "Compiling brilliance...",
        "Brace yourself, loading is coming.",
        "Assembling code magic...",
        "Loading the future...",
        "Hustling pixels...",
        "Warming up the servers...",
        "Constructing digital wonders...",
        "Loading inspiration...",
        "Patience, while we code dreams...",
        "In code, we trust.",
        "Code like there's no tomorrow.",
        "Developers: Turning coffee into code.",
        "JavaScript is the closest thing to magic.",
        "Hack the planet!",
      ];

      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    } catch (error) {
      toast.error("Failed to fetch a random quote.");
    }
  };

  useEffect(() => {
    getRandomQuote();
    // cleanup function
    const loadingTimeout = setTimeout(() => {
      // console.log("Loading completed!");
      dispatch(hideLoading());
    }, 5000);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-8 rounded-md flex flex-col items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      {/* <p className="mt-4 text-gray-800">{quote}</p> */}
    </div>
  );
};

export default Loader;
