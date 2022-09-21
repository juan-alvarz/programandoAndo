import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar"




export const UserRank = () => {
  const location = useLocation();

  const profile = location.state;

  console.log(profile);

  return (
    <div>
    <div>

    <NavBar></NavBar>

    </div>
    <div
      className="flex h-screen justify-center  p-10  shadow-xl"
      style={{ color: "rgb(240,240,240)" }}
    >
      
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3
            className="text-lg font-bold leading-6 text-gray-900"
            style={{ color: "#113452" }}
          >
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <img className="rounded-lg" style={{width:"20%",heigth:"20%"}} src={profile.image.url}></img>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {profile.preferences}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {profile.email}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {profile.biography}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Study</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                {profile.studyStatus}
               
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    </div>
  );
};
