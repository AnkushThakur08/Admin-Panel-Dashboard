import React, { useState } from "react";

// context api
import { useStateContext } from "../../contexts/ContextProvider";

// Components
import { Header } from "../../components";

// REACT TOASTIFY
import { toast } from 'react-toastify';

// APIs
import { adminProfileUpdate } from "../../helper/adminHelper/admin";
import { isAuthenticated } from '../../helper/login/loginHelper';

const Profile = () => {

    // Authentication
    const { data } = isAuthenticated();

  // CONTEXT API
  const { currentMode } = useStateContext();

  // STATES
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: "",
  });

  // Destructure
  const { firstName, lastName, image } = formData;


  const onChange = (name) => (event) => {
    const data = new FormData();
    const value = name === "image" ? event.target.files[0] : event.target.value;
    data.append(name, value);
    setFormData({ ...formData, [name]: value });
    console.log("VALUES", value);
    console.log(formData.image?.lastModified)
  };

  // Update Profile
  const handleSubmit = (e) => {
    e.preventDefault();
    adminProfileUpdate(formData, data.accessToken).then((data) => {
      if (data.message == 'success') {
        setFormData({
          ...formData,
          firstName: '',
          lastName: '',
          image: '',
        });

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
        currentMode === "Dark" ? "bg-[#424242]" : "bg-[#ffffff]"
      }`}
    >
      <Header category="Update" title="Profile" />
      <form
        className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
          currentMode === "Dark"
            ? "bg-[#424242] text-white"
            : "bg-white text-black"
        }`}
        // onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div class="flex w-full mb-3">
          <div class="mb-3 w-full ">
            <label class="block text-sm font-bold mb-2 ">Image</label>
            <input
              onChange={onChange('image')}
              type="file"
              name="image"
              accept="image"
              placeholder="choose a file"
            />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2 " for="firstname">
            First Name
          </label>
          <input
            class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
              currentMode === "Dark"
                ? "bg-[#424242] text-white"
                : "bg-white text-black"
            }`}
            id="firstname"
            type="text"
            value={firstName}
            name="firstName"
            placeholder="First Name"
            onChange={onChange("firstName")}
          />
        </div>
        <div class="mb-4">
          <label class="block  text-sm font-bold mb-2 " for="lastname">
            Last Name
          </label>
          <input
            class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
              currentMode === "Dark"
                ? "bg-[#424242] text-white"
                : "bg-white text-black"
            }`}
            id="lastname"
            type="text"
            value={lastName}
            name="lastName"
            placeholder="Last Name"
            onChange={onChange("lastName")}
          />
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
    </div>
  );
};

export default Profile;
