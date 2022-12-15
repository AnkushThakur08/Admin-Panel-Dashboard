import React,{useState} from 'react'

// context api
import { useStateContext } from "../../contexts/ContextProvider";

// APIs
import {changePassword} from '../../helper/adminHelper/admin'
import { isAuthenticated } from '../../helper/login/loginHelper';

// REACT TOASTIFY
import { toast } from 'react-toastify';

// Components
import { Header } from "../../components";

const ChangePassword = () => {

      // CONTEXT API
  const { currentMode } = useStateContext();

      // Authentication
      const { data } = isAuthenticated();

  // STATES
  const [formData, setFormData] = useState({
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  // Destructure
  const { oldPassword, confirmPassword, newPassword } = formData;

    const onChange = (name) => (event) => {
        const data = new FormData();
        const value = event.target.value;
        data.append(name, value);
        setFormData({ ...formData, [name]: value });
        console.log("VALUES", value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(confirmPassword !== newPassword){
            return toast.error('New Password & Confirm Password Does Not Match')
        }
        changePassword(formData, data.accessToken).then((data) => {
          if (data.message == 'success') {
            setFormData({
              ...formData,
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
    
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        });
      };
  return (
    <div
    className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'}`}
  >
    <Header category="Change" title="Password" />
        <form
      className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
        currentMode === 'Dark'
          ? 'bg-[#424242] text-white'
          : 'bg-white text-black'
      }`}
      method="POST"
      encType="multipart/form-data"
    >
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2 " for="firstname">
          Old Password
        </label>
        <input
          class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-white text-black'
          }`}
          id="oldPassword"
          type="password"
          value={oldPassword}
          name="oldPassword"
          placeholder="Enter Old Password"
          onChange={onChange('oldPassword')}
        />
      </div>
      <div class="mb-4">
        <label class="block  text-sm font-bold mb-2 " for="newPassword">
          New Password
        </label>
        <input
          class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-white text-black'
          }`}
          id="newPassword"
          type="password"
          value={newPassword}
          name="newPassword"
          placeholder="Enter New Password"
          onChange={onChange('newPassword')}
        />
      </div>
      <div class="mb-4">
        <label class="block  text-sm font-bold mb-2 " for="confirmPassword">
          Confirm Password
        </label>
        <input
          class={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-white text-black'
          }`}
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={onChange('confirmPassword')}
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
  )
}

export default ChangePassword