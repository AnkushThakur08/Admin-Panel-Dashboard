import React from 'react';
import { Header } from '../../components';

const EditAppVersion = () => {
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Edit App Version" />
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
                >
                  <option value="1">IOS</option>
                  <option value="2">ANDROID</option>
                  <option value="3">WEB</option>
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
              />
            </div>
            <div class="flex ">
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
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

export default EditAppVersion;
