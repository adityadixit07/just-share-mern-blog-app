import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white w-full pb-4">
      <div className="">
        <div className="flex justify-evenly pt-4">
          <div className="left">
            <h1 className="text-xl font-semibold text-orange-200 ">
              Quick Links
            </h1>
            <ul className="flex gap-1 flex-col mt-2 mb-2">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <h1 className="text-xl font-semibold text-orange-200 mb-2">
              Address
            </h1>
            <p>Kanpur, India</p>
            <p>Email: adityadixit7054@gmail.com</p>
            <p>Phone:+91 7054293380</p>
          </div>
        </div>
      </div>
      <p className="text-center">
        Made by{" "}
        <span className="font-semibold">
          <Link
            to="https://www.linkedin.com/in/adityakumardixit/"
            target="_blank"
            className="text-orange-300 hover:text-orange-400 underline"
          >
            Aditya Kumar Dixit
          </Link>{" "}
        </span>
        😎{" "}
      </p>
    </footer>
  );
};

export default Footer;
