import React, { useState } from 'react';

// react router dom
import { useNavigate, Link, useParams } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

//REACT ICONS
import { IoIosArrowBack } from 'react-icons/io';

// COntext
import { useStateContext } from '../../contexts/ContextProvider';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { addAchievementLevel } from '../../helper/adminAchievementHelper/AdminAchievement';

const AddAchievementLevel = () => {
  // Context
  const { currentMode } = useStateContext();

  // Authentication
  const { data } = isAuthenticated();
  console.log(data.accessToken, 'LINE 29');

  // Navigate
  const navigate = useNavigate();

  // USE PARAMS
  const params = useParams();
  const id = params.ID;

  console.log(id);

  const [formData, setFormData] = useState({
    name: '',
    achievementId: id,
  });

  // Destructure
  const { name } = formData;

  //   Handle Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  //   Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name) {
    //   toast.error('Please Fill Out The Required Fields.');
    // }

    addAchievementLevel(data.accessToken, formData).then((data) => {
      console.log(data);
      if (data.message == 'success') {
        setFormData({
          ...formData,
          name: data.data.name,
        });

        toast.success(data.message);

        setTimeout(() => {
          navigate(`/viewAdminAchievement/${id}`);
        }, 2000);
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-white'
        }`}
      >
        <Link to={`/viewAdminAchievement/${id}`}>
          <IoIosArrowBack
            size={25}
            className={`mb-3 ${currentMode === 'Dark' ? 'text-white' : ''}`}
          />
        </Link>
        <Header category="Page" title="ADD Admin Achievement" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
            currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-white'
          }`}
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label
              class={`block text-sm font-bold mb-2 ${
                currentMode === 'Dark' ? ' text-white' : ' text-gray-700'
              }`}
              for="name"
            >
              Name
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline  
              ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'text-gray-700'
              }`}
              id="firstname"
              type="text"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="Enter Achievement"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3
               ${
                 currentMode === 'Dark'
                   ? 'text-white bg-black hover:bg-[#20232a]'
                   : 'text-white bg-blue-500 hover:bg-blue-700'
               }`}
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs"></p>
        {/* </div> */}
      </div>
    </>
  );
};

export default AddAchievementLevel;
