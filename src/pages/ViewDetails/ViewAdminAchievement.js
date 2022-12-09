import React, { useEffect, useState } from "react";

// REACT ROUTER DOM
import { useParams, Link, useNavigate } from "react-router-dom";

// HEADER COMPONENT
import { Header } from "../../components";

//REACT ICONS
import { IoIosArrowBack } from "react-icons/io";

// React Data Table
import DataTable from "react-data-table-component";

// Context
import { useStateContext } from "../../contexts/ContextProvider";

// HELPER FILES
import { isAuthenticated } from "../../helper/login/loginHelper";
import { getIndividualData } from "../../helper/adminAchievementHelper/AdminAchievement";
import { getAchievementLevelData } from "../../helper/adminAchievementHelper/AdminAchievement";
import {deleteAchievementLevelData} from "../../helper/adminAchievementHelper/AdminAchievement";

//react toastify
import { toast } from "react-toastify";

const ViewAdminAchievement = () => {
  // Context
  const { currentMode } = useStateContext();

  // used for navigation
  const navigate = useNavigate();

  // PARAMS
  const params = useParams();
  const ID = params.id;
  console.log(ID, ID)

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    name: "",
    type: "",
  });
  const { name, type } = values;

  // STATES
  const [search, setSearch] = useState('');
  const [achievementLevel, setAchievementLevel] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);


  const preload = () => {
    //   console.log(userid);
    getIndividualData(ID, data.accessToken)
      .then((data) => {
        console.log("DATA", data);

        if (data.message == "success") {
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

  //GET ACHIEVEMENT LEVEL DATA OF A PARTICULAR ACHIEVEMENT ID
  const getAchievementLevel = () => {
    //   console.log(userid);
    getAchievementLevelData(ID, data.accessToken)
      .then((data) => {
        console.log("DATA", data);
        if (data.message == "success") {
          setAchievementLevel(data.data.rows);
          setFilterData(data.data.rows);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE ACHIEVEMENT LEVEL
  async function deleteAchievementLevel() {
    let id = localStorage.getItem('achievementLevelId');
    console.log('achievementLevelId', id);
    deleteAchievementLevelData(data.accessToken, id).then((result) => {
      console.log(result);
      toast('Deletion successful.');
      getAchievementLevel();
    });
    setshowDeleteModal(false);
    localStorage.removeItem('achievementLevelId');
  }

   // DELETE MODAL
   const handleShow = (id) => {
    setshowDeleteModal(true);
    localStorage.setItem('achievementLevelId', id);
  };

  const colunms = [
    {
      name: (
        <h6 className="px-24">
          <b>Sr.No</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
      grow: 1,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.name,
      sortable: true,
      grow:0.5
    },
    {
      name: (
        <h6 className="px-16">
          <b>Achievement ID</b>
        </h6>
      ),
      selector: (row) => row.achievementId,
      sortable: true,
    },

    {
      name: (
        <h6 className="px-10">
          <b>Action</b>
        </h6>
      ),
      selector: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "110px",
          }}
        >
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => navigate(`/editAchievementLevel/${row.id}/${row.achievementId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => handleShow(row.id)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
        </div>
      ),
      grow: 0.5
      // ),
    },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  useEffect(() => {
    preload();
    getAchievementLevel();
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
        currentMode === "Dark" ? "bg-[#424242]" : "bg-[#ffffff]"
      }`}
    >
      <Link to="/adminAchievement">
        <IoIosArrowBack size={25} className="mb-3" />
      </Link>
      <Header category="Details" title="Achievement Details" />
      <div class="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div class="px-6 pt-4 pb-2">
          <table class="border-none ">
            <tbody className={`${currentMode === "Dark" ? "text-white" : ""}`}>
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

        {/* ADD BUTTON */}
        <div class="flex float-right mb-2.5">
          <button
            class={`w-full  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 ${
              currentMode === "Dark"
                ? "bg-black hover:bg-[#20232a] text-white"
                : " bg-blue-500 hover:bg-blue-700 text-white"
            }`}
            type="submit"
            onClick={()=> navigate(`/addAchievementLevel/${ID}`)}
          >  
            Add Achievement Level
          </button>
        </div>

        {/* ACHIEVEMENT LEVEL */}
        <DataTable
          columns={colunms}
          data={filterData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          // onRowClicked={handleRowClick}
          selectableRowsHighlight
          highlightOnHover
          pointerOnHover
          subHeader
          theme={currentMode === "Dark" ? "dark" : "light"}
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              className={`${
                currentMode === "Dark"
                  ? "bg-[#424242] text-white"
                  : "form-control"
              } `}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          }
        />
      </div>

      {showDeleteModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Confirmation</h3>
                    {/* <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={handleClose}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button> */}
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Are you sure, you want to delete this record?
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={deleteAchievementLevel}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setshowDeleteModal(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </div>
  );
};

export default ViewAdminAchievement;
