import React, { useState, useEffect } from 'react';

// React Router
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// REACT ICONS
import {IoIosArrowBack} from "react-icons/io" 

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { createAppVersion } from '../../helper/Table/appVersionTableHelper';

const AddAppVersion = () => {
  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  // STATE
  const [values, setValues] = useState({
    name: '',
    version: '',
    minVersion: '',
  });

  // Destructure the State
  const { name, version, minVersion } = values;

  // HandleChange
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  // ADD App Version
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });

    createAppVersion(data.accessToken, values).then((data) => {
      console.log(data);
      if (data.message == 'success') {
        setValues({
          ...values,
          name: '',
          version: '',
          minVersion: '',
        });

        toast.success(data.message);

        setTimeout(() => {
          navigate('/appVersion');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Link to="/appVersion">
        <IoIosArrowBack size={25} className="mb-3" />
      </Link>
        <Header category="Page" title="Add App Version" />
        <div class="max-w-full max-w-full">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div class="flex ">
              <div class="mb-3 w-full ">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 "
                  for=""
                >
                  Name
                </label>
                <select
                  class=" w-full form-select appearance-none block max-w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Name"
                  onChange={handleChange('name')}
                  value={name}
                >
                  <option value="IOS">IOS</option>
                  <option value="ANDROID">ANDROID</option>
                  <option value="WEB">WEB</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 "
                for="version"
              >
                Version
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="version"
                type="text"
                placeholder="1"
                onChange={handleChange('version')}
                value={version}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 "
                for="minimumversion"
              >
                Minimum Version
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="minimumversion"
                type="text"
                placeholder="1.0.0"
                onChange={handleChange('minVersion')}
                value={minVersion}
              />
            </div>
            <div class="flex ">
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={onSubmit}
              >
                Save
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs"></p>
        </div>
      </div>
    </>
  );
};

export default AddAppVersion;
