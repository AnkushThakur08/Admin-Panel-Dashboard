import React, { useEffect, useState } from "react";

// React Data Table
import DataTable from "react-data-table-component";

// React Router
import { useNavigate } from "react-router-dom";

// React Toastify
import { toast } from "react-toastify";

// Axios
import axios from "axios";

// Components
import { Header } from "../../components";

// API
import { isAuthenticated } from "../../helper/login/loginHelper";
import { achievementListData } from "../../helper/Table/TableHelper";
import {deleteAchievementData} from "../../helper/adminAchievementHelper/AdminAchievement"

const AdminAchievement = () => {
  const { data, token } = isAuthenticated();

// useNavigate
  const navigate = useNavigate();

  // STATES
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  // SHOW DELETE MODAL
  const handleShow = (id) => {
    setshowDeleteModal(true);
    localStorage.setItem("achievementId", id);
  };

  // FETCHING TABLE DATA 
  const preload = () => {
    achievementListData(data.accessToken)
      .then((data) => {
        setAdminData(data.data.rows);
        setFilterData(data.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE ADMIN ACHIEVEMENT
  async function deleteAdminAchievement() {
    let id = localStorage.getItem("achievementId");
    console.log("id", id);
    deleteAchievementData(data.accessToken, id).then((result) => {
      console.log(result);
      toast(result.data.data);
      preload();
    });
    setshowDeleteModal(false);
    localStorage.removeItem("achievementId");
  }

  const colunms = [
    {
      name: (
        <h6>
          <b>Sr.No</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Type</b>
        </h6>
      ),
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => navigate(`/editAdminAchievement/${row.id}`)}
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
  }, []);

  useEffect(() => {
    const result = adminData.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase()) ||
        value.type.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);
  // console.log(admin);

  // const handleRowClicked = (row) => {
  //   navigate(`/admindetails/${row.uId}`);
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Admin Achievements" />
      <DataTable
        // title="Admin"
        columns={colunms}
        data={filterData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        // onRowClicked={handleRowClicked}
        selectableRowsHighlight
        highlightOnHover
        // progressPending
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            className="  form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid black",
            }}
          />
        }
      />

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
                    onClick={deleteAdminAchievement}
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

      <button
        title="Add"
        class="fixed z-90 bottom-24 right-3.5 bg-cyan-400 w-14 h-14 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-3xl "
      >
        +
      </button>
    </div>
  );
};

export default AdminAchievement;
