import React from "react";
import Faq from "./Faq";

const ServicePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our services to enhance your profile!
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Service Cards */}
          {/* Service 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Run Ads on Request
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Let us promote your content with targeted ads. Reach your
                audience effectively.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Customize & Enhance Profile
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Personalize your profile and make it stand out. Impress others
                with a unique identity.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Become a Seller of Blogs
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Share your expertise. Sell your blogs and articles to our vast
                user base.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Faq />
    </div>
  );
};

export default ServicePage;
