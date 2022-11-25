import React from 'react'
import { Header } from '../../components';

const EditAdmin = () => {
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Edit Admin" />
    {/* <div class="w-full max-w-xs  "> */}
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ">
    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 " for="firstname">
          First Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="First Name" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 " for="lastname">
          Last Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 " for="username">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
      </div>
{/*       <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password"/>
      </div> */}
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Save
        </button>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
    </p>
  {/* </div> */}
  </div>

  </>
  )
}

export default EditAdmin