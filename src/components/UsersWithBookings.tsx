import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const UsersWithBookings: React.FC = () => {
  const {
    data: usersWithBookings,
    isLoading,
    isError,
  } = useQuery("fetchUsersWithBookings", apiClient.fetchUsersWithBookings, {
    onError: () => {},
  });

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-4">Error fetching data</div>;
  }

  if (!usersWithBookings || usersWithBookings.length === 0) {
    return <div className="text-center mt-4">No users found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl text-center text-orange font-bold mb-6">
        My Users
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">First Name</th>
              <th className="px-6 py-3 text-left">Last Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {usersWithBookings.map((user) => (
              <tr key={user._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/${user._id}/users-with-hotelbookings`}
                    className="text-orange  hover:text-gray-700"
                  >
                    View Bookings
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersWithBookings;
