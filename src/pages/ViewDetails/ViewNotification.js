import React, { useEffect, useState } from 'react';

// REACT ROUTER DOM
import { Link, useParams } from 'react-router-dom';

// HEADER COMPONENT
import { Header } from '../../components';

// DATE FORMATTER

import moment from 'moment-js';

//REACT ICONS
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// HELPER FILES
import { isAuthenticated } from '../../helper/login/loginHelper';
import { getIndividualNotification } from '../../helper/Table/notificationTableHelper';

const ViewNotification = () => {
  // Context
  const { currentMode } = useStateContext();

  // PARAMS
  const params = useParams();
  const ID = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    id: '',
    title: '',
    message: '',
    createdAt: '',
  });

  // DESTRUCTURE
  const { id, title, message, createdAt } = values;

  // GETTING INDIVIDUAL USER DATA
  const preload = () => {
    getIndividualNotification(ID, data.accessToken)
      .then((data) => {
        console.log(data);
        console.log(data.data?.Details.id);
        setValues({
          ...values,
          id: data.data?.Details.id,
          title: data.data?.Details.title,
          message: data.data?.Details.message,
          createdAt: data.data?.Details.createdAt,
        });
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
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
        currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
      }`}
    >
      <Link to="/notification">
        <BsFillArrowLeftCircleFill
          size={25}
          className={`mb-3 ${currentMode === 'Dark' ? 'text-white' : ''}`}
        />
      </Link>
      <Header category="Details" title="Notification" />
      <div className="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div className="px-6 pt-4 pb-2">
          <table className="border-none ">
            <tbody className={`${currentMode === 'Dark' ? 'text-white' : ''}`}>
              <tr>
                <td className="border-none pr-32  py-2">ID</td>
                <td className="border-none ">{id}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Last Name</td>
                <td className="border-none ">{title}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">message</td>
                <td className="border-none ">{message}</td>
              </tr>

              <tr>
                <td className="border-none pr-32 py-2">Created At</td>
                <td className="border-none ">{moment(createdAt).format()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewNotification;
