import React from "react";
import { useQuery } from "react-query";
import { fetchUserProfile, UserProfileResponse } from "../api-client";

const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError } = useQuery(["profile", userId], () =>
    // fetchUserProfile(userId.userId)

    {
      return fetchUserProfile(userId);
    }
  );

  if (isLoading)
    return <div className="text-center mt-4">Checking the profile...</div>;

  if (isError)
    return <div className="text-center mt-4">Error fetching data</div>;

  const { user } = data as UserProfileResponse;

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h2 className="text-2xl text-center text-orange font-bold mb-2">
        User Profile
      </h2>

      <form>
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-medium">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-orange-500 focus:border-orange-500 block w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-medium">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-orange-500 focus:border-orange-500 block w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-orange-500 focus:border-orange-500 block w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block font-medium">
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={user.role}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-orange-500 focus:border-orange-500 block w-full"
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
