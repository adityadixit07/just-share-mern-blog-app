import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq = () => {
  const [accordion, setAccordion] = useState([
    {
      id: 1,
      question: "How can I request an ad campaign?",
      answer:
        "You can request an ad campaign by logging into your account and navigating to the advertising section. From there, follow the prompts to submit your request and our team will get in touch with you.",
      isOpen: false,
    },
    {
      id: 2,
      question: "What customization options are available for profiles?",
      answer:
        "We offer various customization options such as profile themes, fonts, layouts, and more. Visit the profile settings section to explore and personalize your profile.",
      isOpen: false,
    },
    {
      id: 3,
      question: "How do I become a seller of blogs on your platform?",
      answer:
        "To become a seller, you need to create an account, navigate to the seller dashboard, and submit your blog for review. Once approved, you can start selling your blogs to our users.",
      isOpen: false,
    },
  ]);

  const toggleAccordion = (id) => {
    setAccordion((prevAccordion) =>
      prevAccordion.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Answers to common queries about our services.
        </p>
      </div>
      <div className="mt-12">
        {accordion.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow overflow-hidden rounded-lg mt-4 "
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full px-4 py-5 sm:p-6 text-left focus:outline-none flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.question}
              </h3>
              {item.isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {item.isOpen && (
              <div
                className={`px-4 pb-5 sm:p-6 text-left ${
                  item.isOpen ? "block" : "hidden"
                } transition duration-300 ease-in-out`}
              >
                <p className="mt-0 text-sm text-gray-500">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
