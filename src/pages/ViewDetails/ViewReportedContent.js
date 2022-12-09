import React, { useEffect, useState } from 'react';

// REACT ROUTER DOM
import { useParams, Link, useNavigate } from 'react-router-dom';

// HEADER COMPONENT
import { Header } from '../../components';

//REACT ICONS
import { IoIosArrowBack } from 'react-icons/io';

// React Data Table
import DataTable from 'react-data-table-component';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// HELPER FILES
import { isAuthenticated } from '../../helper/login/loginHelper';
import { getIndividualData } from '../../helper/adminAchievementHelper/AdminAchievement';
import { getAchievementLevelData } from '../../helper/adminAchievementHelper/AdminAchievement';
import { deleteAchievementLevelData } from '../../helper/adminAchievementHelper/AdminAchievement';

//react toastify
import { toast } from 'react-toastify';

const ViewReportedContent = () => {
  // Context
  const { currentMode } = useStateContext();

  // used for navigation
  const navigate = useNavigate();

  // PARAMS
  const params = useParams();
  const ID = params.id;
  console.log(ID, ID);

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    name: '',
    description: '',
    status: '',
  });
  const { name, type } = values;

  // STATES
  const [search, setSearch] = useState('');
  const [achievementLevel, setAchievementLevel] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  const preload = () => {
    //   console.log(userid);
    reportedContentIndividualData(ID, data.accessToken)
      .then((data) => {
        console.log('DATA', data);

        if (data.message == 'success') {
          setValues({
            ...values,
            name: data.data.name,
            description: data.data.description,
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

  useEffect(() => {
    const result = achievementLevel.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase()) ||
        value.achievementId.toLowerCase().match(search.toLowerCase()) ||
        value.createdAt.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

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
      <div className="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div className="px-6 pt-4 pb-2">
          <table className="border-none ">
            <tbody className={`${currentMode === 'Dark' ? 'text-white' : ''}`}>
              <tr>
                <td className="border-none pr-32  py-2">Reported By</td>
                <td className="border-none">{name}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Reported Item</td>
                <td className="border-none">{type}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Date</td>
                <td className="border-none">{type}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Status</td>
                <td className="border-none">{type}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Description</td>
                <td className="border-none">{type}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div class="flex ">
            <div class="mb-3 w-full ">
              <label class="block text-gray-700 text-sm font-bold mb-2 " for="">
                Status
              </label>
              <select
                class=" w-full form-select appearance-none block max-w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Name"
                onChange={handleChange('status')}
                value={status}
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="DECLINED">Declined</option>
              </select>
            </div>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="version"
            >
              Description
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="version"
              type="text"
              placeholder="1"
              onChange={handleChange('version')}
              value={description}
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
      </div>
    </div>
  );
};

export default ViewReportedContent;
