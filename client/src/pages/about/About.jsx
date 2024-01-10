import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Just{" "}
            <span className="text-orange-400 border-b border-black">Share</span>
          </h2> */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">
            Discover our story and passion for sharing knowledge.
          </h1>
        </div>
        <div className="flex flex-wrap -mx-4">
          {/* Mission Section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We're committed to empowering individuals by delivering
                high-quality, informative, and engaging content that inspires
                and educates.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We envision a platform where ideas flourish, diverse
                perspectives thrive, and our readers find inspiration in every
                article they read.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Meet Our Team
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our team comprises creative minds dedicated to crafting
                compelling stories and sharing valuable insights across various
                topics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
