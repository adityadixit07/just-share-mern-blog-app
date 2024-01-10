import React, { useState, useEffect, useRef } from "react";

const Popup = ({ onClose }) => {
  const popupRef = useRef();

  const handleClose = (e) => {
    if (!popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      handleClose(e);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-white p-6 rounded shadow-lg">
        <p className="text-lg font-semibold mb-4">Please Login First</p>
        <p className="text-gray-700 mb-4">
          To access this feature, please log in to your account.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;



// <div className="flex justify-center items-center h-screen">
// <button
//   onClick={openPopup}
//   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// >
//   Open Popup
// </button>

// {showPopup && <Popup onClose={closePopup} />}
// </div>


// const [showPopup, setShowPopup] = useState(false);

//   const openPopup = () => {
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };
