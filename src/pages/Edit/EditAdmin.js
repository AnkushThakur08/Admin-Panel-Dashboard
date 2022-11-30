import React,{useState} from "react";
import { toast } from "react-toastify";
import { Header } from "../../components";

const EditAdmin = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    admin_permissions: [
      {
        module: "",
        permission: "",
      },
    ],
    email: "",
    adminType: "",
  });

  const {firstName, lastName, id, admin_permissions, email, adminType} = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!email || !firstName || !lastName){
      toast.error("Please Fill Out The Required Fields.")
    }
  }


  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Edit Admin" />
        {/* <div class="w-full max-w-xs  "> */}
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="firstname"
            >
              First Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              value={firstName}
              name={firstName}
              placeholder="First Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="lastname"
            >
              Last Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="username"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="email"
              value={email}
              placeholder="Username"
              onChange={onChange}
            />
          </div>

          <div class="flex w-full">
            <div class="mb-3 w-full ">
              <label class="block text-gray-700 text-sm font-bold mb-2 " for="">
                Admin Type
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
                value={adminType}
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="SUb_ADMIN">Sub Admin</option>
              </select>
            </div>
          </div>

          <label class="block text-gray-700 text-sm font-bold mb-2 ">
            Admin Access
          </label>

          <div className="flex justify-between mb-2.5">
            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value={admin_permissions.permission}
                  name=""
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox1"
                >
                  Dashboard
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value={reportManagement}
                  name={reportManagement}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
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
                  value={userManagement}
                  name={userManagement}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
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
                  value={adminManagement}
                  name={adminManagement}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
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
                  value={notificationManagement}
                  name={notificationManagement}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
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
                  value={systemConfiguration}
                  name={systemConfiguration}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox2"
                >
                System Configuration
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
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

export default EditAdmin;
