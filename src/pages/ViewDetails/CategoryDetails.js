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
import { categoryIndividualData } from '../../helper/Table/categoryTableHelper';

const CategoryDetails = () => {
  // Context
  const { currentMode } = useStateContext();

  // PARAMS
  const params = useParams();
  const ID = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    Name: '',
    createdAt: '',
  });

  // DESTRUCTURE
  const { Name, createdAt } = values;

  // GETTING INDIVIDUAL USER DATA
  const preload = () => {
    categoryIndividualData(data.accessToken, ID)
      .then((data) => {
        console.log(data);
        setValues({
          ...values,
          Name: data.data.name,
          createdAt: data.data.createdAt,
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
      <Link to="/category">
        <BsFillArrowLeftCircleFill
          size={25}
          className={`mb-3 ${currentMode === 'Dark' ? 'text-white' : ''}`}
        />
      </Link>
      <Header category="Details" title="Category" />
      <div className="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div className="px-6 pt-4 pb-2">
          <table className="border-none ">
            <tbody className={`${currentMode === 'Dark' ? 'text-white' : ''}`}>
              <tr>
                <td className="border-none pr-32  py-2">Name</td>
                <td className="border-none">{Name}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Created At</td>
                <td className="border-none">{moment(createdAt).format()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
