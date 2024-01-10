import React from "react";
import { useSelector } from "react-redux";

const DisplayUserList = () => {
  const { Users } = useSelector((state) => state.allUsers);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Users?.map((user) => (
          <div
            key={user?._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
              <p className="text-gray-600 mb-2">
                Followers: {user?.followers.length}
              </p>
              <p className="text-gray-600 mb-2">
                Following: {user?.following.length}
              </p>
              <p className="text-gray-600 mb-4">Posts: {user?.posts.length}</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayUserList;
