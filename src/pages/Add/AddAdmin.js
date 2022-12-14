import React, { useState, useEffect } from 'react';

// react router dom
import { useNavigate, useParams, Link } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

//REACT ICONS
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

// Components
import { Header } from '../../components';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// API
import { addAdmin } from '../../helper/adminHelper/admin';
import { isAuthenticated } from '../../helper/login/loginHelper';

const AddAdmin = () => {
  // Context
  const { currentMode } = useStateContext();

  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    adminType: '',
    admin_permissions: [
      {
        module: 'module',
        permission: '0',
      },
    ],
  });

  // Destructure
  const { firstName, lastName, email, adminType, admin_permissions } = formData;

  // Add Admin
  const add = () => {
    addAdmin(formData, data.accessToken)
      .then((result) => {
        if (result.statusCode == 200) {
          toast.success(result.message);
          console.log('resulttt', result);

          setTimeout(() => {
            navigate('/admin');
          }, 2500);
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Setting object in Item
  let item = { firstName, lastName, admin_permissions, email, adminType };

  console.log(item, '.....000000.....');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  const addPermissions = (e) => {
    const value = e.target.value; /* Dasboard */
    console.log(e.target.checked);
    const somevalue = admin_permissions; /* Allocated Permission */

    if (e.target.checked) {
      somevalue.push({
        module: value,
        permission: '1',
      });
      setFormData({ ...formData, admin_permissions: somevalue });
    }

    if (!e.target.checked) {
      somevalue.push({
        module: value,
        permission: '0',
      });
    }

    console.log(somevalue, 'somevalue');
  };

  const handleSubmit = (e) => {
    console.log(admin_permissions.length, 'ARRAY LENGTH');
    e.preventDefault();
    if (admin_permissions.length <= 2) {
      toast.error('Please Fill Out The Required Fields.');
    }
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-white'
        }`}
      >
        <Link to="/admin">
          <BsFillArrowLeftCircleFill
            size={25}
            className={`mb-3  ${currentMode === 'Dark' ? 'text-white' : ''}`}
          />
        </Link>
        <Header category="Add" title="Admin" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-white text-black'
          }`}
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2 " for="firstname">
              First Name
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="firstname"
              type="text"
              value={firstName}
              name="firstName"
              placeholder="First Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2 " for="lastname">
              Last Name
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="lastname"
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2 " for="username">
              Email
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="username"
              type="text"
              name="email"
              value={email}
              placeholder="Username"
              onChange={onChange}
            />
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="blocktext-sm font-bold mb-2 " for="">
                Admin Type
              </label>
              <select
                class={`form-select appearance-none
                 block
                 w-full
                 px-3
                 py-1.5
                 text-base
                 font-normal
                 border border-solid border-gray-300
                 rounded
                 transition
                 ease-in-out
                 m-0
                 focus:text-gray-700  focus:border-blue-600 focus:outline-none
                 ${
                   currentMode === 'Dark'
                     ? 'bg-[#424242] text-white focus:text-white focus:border-white'
                     : 'bg-white text-black'
                 }
               `}
                onChange={onChange}
                value={adminType}
                name="adminType"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="SUB_ADMIN">Sub Admin</option>
              </select>
            </div>
          </div>

          <label class="block  text-sm font-bold mb-2 ">Admin Access</label>

          <div
            className={`flex justify-between mb-2.5 ${
              currentMode === 'Dark' ? 'text-white' : ''
            }`}
          >
            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="dashboard"
                  value="dashboard"
                  onClick={addPermissions}
                  name="permissions"
                />
                <label
                  class="form-check-label mr-1.5 mb-2 inline-block"
                  for="inlineCheckbox1"
                >
                  Dashboard
                </label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="report"
                  value="reportManagement"
                  name="permissions"
                  onClick={addPermissions}
                />
                <label
                  class="form-check-label mr-1.5 inline-block "
                  for="inlineCheckbox2"
                >
                  Report
                </label>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="userManagement"
                  name="permissions"
                  // onChange={test}
                  onClick={addPermissions}
                />
                <label
                  class="form-check-label mr-1.5 mb-2 inline-block"
                  for="inlineCheckbox1"
                >
                  User Mangement
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="adminManagement"
                  name="permissions"
                  // onChange={test}
                  onClick={addPermissions}
                />
                <label
                  class="form-check-label mr-1.5 inline-block"
                  for="inlineCheckbox2"
                >
                  Admin
                </label>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="notificationManagement"
                  name="permissions"
                  onClick={addPermissions}
                />
                <label
                  class="form-check-label mr-1.5 mb-2 inline-block "
                  for="inlineCheckbox1"
                >
                  Notification
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="systemConfiguration"
                  name="permissions"
                  onClick={addPermissions}
                />
                <label
                  class="form-check-label mr-1.5 inline-block"
                  for="inlineCheckbox2"
                >
                  System Configuration
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
              type="submit"
              onClick={add}
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

export default AddAdmin;
