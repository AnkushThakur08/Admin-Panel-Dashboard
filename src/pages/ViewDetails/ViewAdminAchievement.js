import React, { useEffect, useState } from 'react';

// REACT ROUTER DOM
import { useParams, Link } from 'react-router-dom';

// HEADER COMPONENT
import { Header } from '../../components';

//REACT ICONS
import { IoIosArrowBack } from 'react-icons/io';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// HELPER FILES
import { isAuthenticated } from '../../helper/login/loginHelper';
import { getIndividualData } from '../../helper/adminAchievementHelper/AdminAchievement';
import { toast } from 'react-toastify';

const ViewAdminAchievement = () => {
  // Context
  const { currentMode } = useStateContext();

  // PARAMS
  const params = useParams();
  const ID = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    name: '',
    type: '',
  });

  const { name, type } = values;

  const preload = () => {
    //   console.log(userid);
    getIndividualData(ID, data.accessToken)
      .then((data) => {
        console.log('DATA', data);

        if (data.message == 'success') {
          setValues({
            ...values,
            name: data.data.name,
            type: data.data.type,
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl ${
        currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
      }`}
    >
      <Link to="/adminAchievement">
        <IoIosArrowBack size={25} className="mb-3" />
      </Link>
      <Header category="Details" title="Achievement Details" />
      <div class="max-w-full rounded overflow-hidden shadow-lg pb-10">
        {/* <div class="px-6 py-4">
          <span></span>
        </div> */}
        <div class="px-6 pt-4 pb-2">
          <table class="border-none ">
            <tbody className={`${currentMode === 'Dark' ? 'text-white' : ''}`}>
              <tr>
                <td class="border-none pr-32  py-2">Name</td>
                <td class="border-none">{name}</td>
              </tr>
              <tr>
                <td class="border-none pr-32 py-2">Type</td>
                <td class="border-none">{type}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminAchievement;
