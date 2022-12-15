import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import profilePicture from '../data/flower.jpeg'
import { Navigate, useNavigate, Link } from 'react-router-dom';

// API
import { isAuthenticated } from '../helper/login/loginHelper';

const UserProfile = () => {
  const { currentColor, currentMode } = useStateContext();
  const navigate = useNavigate();

      // Authentication
      const { data } = isAuthenticated();

  function logout (){
    localStorage.removeItem('jwt')
    setTimeout(() => {
      navigate("/login")
      navigate(0)
    }, 1000);
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={profilePicture}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {data.adminDetails.firstName +" "+ data.adminDetails.lastName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Administrator   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {data.adminDetails.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <Link to={`${item.path}`}>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        {/* <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={logout}
        /> */}
        <input  type="button" value="Logout" onClick={logout} style={{backgroundColor: `${currentColor}`}} className="p-2 w-full text-center text-white text-lg font-semibold rounded-lg cursor-pointer" />
      </div>
    </div>

  );
};

export default UserProfile;
