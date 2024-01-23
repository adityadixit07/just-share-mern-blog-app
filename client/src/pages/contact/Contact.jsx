import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../utils/API";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    try {
      const response = await API.post("/contact/message", {
        name,
        email,
        message,
      });
      const { data } = response;
      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="bg-gray-100 max-h-screen mt-[5rem]">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch with us! We'd love to hear from you.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Message*
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Give any suggestion or express your query...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
