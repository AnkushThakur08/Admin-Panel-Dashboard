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
import { getIndividualData } from '../../helper/adminAchievementHelper/AdminAchievement';
import { Edit } from '../../helper/adminAchievementHelper/AdminAchievement';
import { isAuthenticated } from '../../helper/login/loginHelper';

const EditAdminAchievement = () => {
  // Context
  const { currentMode } = useStateContext();

  // PARAMS
  const params = useParams();
  const ID = params.id;

  console.log(ID, '000000');

  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: '',
  });

  // Destructure
  const { id, name, type } = formData;

  const preload = () => {
    console.log(ID);
    getIndividualData(ID, data.accessToken)
      .then((data) => {
        console.log(data, 'dataaa');
        setFormData({
          ...formData,
          id: ID,
          name: data.data.name,
          type: data.data.type,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  // Edit Admin
  const edit = () => {
    Edit(formData, data.accessToken)
      .then((result) => {
        toast.success(result.data);
        console.log('resulttt', result);

        setTimeout(() => {
          navigate('/adminAchievement');
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      toast.error('Please Fill Out The Required Fields.');
    }
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
        }  `}
      >
        <Link to="/adminAchievement">
          <BsFillArrowLeftCircleFill
            size={25}
            className={`mb-3 ${currentMode === 'Dark' ? 'text-white' : ''}`}
          />
        </Link>

        <Header category="Edit" title=" Admin Achievement" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-[#ffffff] text-gray-700'
          }`}
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2 " for="name">
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="firstname"
              type="text"
              value={name}
              name="name"
              onChange={onChange}
            />
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="block  text-sm font-bold mb-2 ">Type</label>
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
                   focus:outline-none
                 ${
                   currentMode === 'Dark'
                     ? 'bg-[#424242] text-white focus:text-white focus:border-white'
                     : 'bg-white text-black  focus:border-blue-600'
                 }
               `}
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
              onClick={edit}
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

export default EditAdminAchievement;
