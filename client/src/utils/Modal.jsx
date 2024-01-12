// import React from "react";

// const Modal = ({ title, data, onClose }) => {
//   return (
//     <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto max-h-96">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-900">{title}</h2>
//         {data?.length === 0 ? (
//           <p className="text-gray-600">No data found.</p>
//         ) : (
//           <ul>
//             {data?.map((item) => (
//               <div
//                 key={item?._id}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <div>
//                   <h1 className="font-semibold text-xl">{item?.name}</h1>
//                   <p className="text-gray-500">{item?.email}</p>
//                 </div>
//                 <img
//                   src={item?.avatar}
//                   alt=""
//                   className="w-10 h-10 rounded-full"
//                 />
//               </div>
//             ))}
//           </ul>
//         )}
//         <button
//           onClick={onClose}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// import React from "react";

// const Modal = ({ title, data, onClose }) => {
//   return (
//     <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto max-h-96 mx-4 md:mx-0">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-900">{title}</h2>
//         {data?.length === 0 ? (
//           <p className="text-gray-600">No data found.</p>
//         ) : (
//           <ul>
//             {data?.map((item) => (
//               <div
//                 key={item?._id}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <div>
//                   <h1 className="font-semibold text-xl">{item?.name}</h1>
//                   <p className="text-gray-500">{item?.email}</p>
//                 </div>
//                 <img
//                   src={item?.avatar}
//                   alt=""
//                   className="w-10 h-10 rounded-full"
//                 />
//               </div>
//             ))}
//           </ul>
//         )}
//         <button
//           onClick={onClose}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import { RiCloseLine } from "react-icons/ri"; // Import the close icon from react-icons library

const Modal = ({ title, data, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto max-h-96 mx-4 md:mx-0 relative">
        {/* Close icon at the top right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <RiCloseLine size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-blue-900">{title}</h2>
        {data?.length === 0 ? (
          <p className="text-gray-600">No data found.</p>
        ) : (
          <ul>
            {data?.map((item) => (
              <div
                key={item?._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <h1 className="font-semibold text-xl">{item?.name}</h1>
                  <p className="text-gray-500">{item?.email}</p>
                </div>
                <img
                  src={item?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
            ))}
          </ul>
        )}
        {/* Separate button at the bottom */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
