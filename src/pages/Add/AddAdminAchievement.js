import React, { useState } from 'react';

// react router dom
import { useNavigate, Link } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

//REACT ICONS
import { IoIosArrowBack } from 'react-icons/io';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { createAdminAchievement } from '../../helper/adminAchievementHelper/AdminAchievement';

const AddAdminAchievement = () => {
  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  // Destructure
  const { name, type } = formData;

  //   Handle Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  //   Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      toast.error('Please Fill Out The Required Fields.');
    }

    createAdminAchievement(data.accessToken, formData).then((data) => {
      console.log(data);
      if (data.message == 'success') {
        setFormData({
          ...formData,
          name: '',
          type: '',
        });

        toast.success(data.message);

        setTimeout(() => {
          navigate('/adminAchievement');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-lg">
        <Link to="/adminAchievement">
          <IoIosArrowBack size={25} className="mb-3" />
        </Link>
        <Header category="Page" title="ADD Admin Achievement" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="name"
            >
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="Enter Achievement"
            />
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="block text-gray-700 text-sm font-bold mb-2 ">
                Type
              </label>
              <select
                class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={onChange}
                value={type}
                name="type"
              >
                <option value="Sequential">Sequential</option>
                <option value="Parallel">Parallel</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
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

export default AddAdminAchievement;
