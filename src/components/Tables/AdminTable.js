import React, { useEffect, useState } from 'react';

// React Data Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

//React Icons
import { FiFilter } from 'react-icons/fi';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { adminListData } from '../../helper/Table/TableHelper';
import { deleteAdminData } from '../../helper/Table/adminTableHelper';
import { blockOrUnblockAdmin } from '../../helper/Table/adminTableHelper';

const AdminTable = () => {
  // Context
  const { currentMode } = useStateContext();

  // Authorization
  const { data } = isAuthenticated();

  const userId = data.adminDetails.id;

  // Navigate
  const navigate = useNavigate();

  // STATE
  const [search, setSearch] = useState('');
  const [adminData, setAdminData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [adminType, setAdminType] = useState('');

  // State for checkboxes
  const [checkBox, setCheckbox] = useState('');
  const checkBoxValue = checkBox;

  // DELETE MODAL
  const handleShow = (id) => {
    setshowDeleteModal(true);
    localStorage.setItem('adminId', id);
  };

  async function deleteAdmin() {
    let uId = localStorage.getItem('adminId');
    console.log('UID', uId);
    deleteAdminData(data.accessToken, uId).then((result) => {
      console.log(result);
      toast('Deletion successful.');
      preload();
    });
    setshowDeleteModal(false);
    localStorage.removeItem('adminId');
  }

  // BLOCK MODAL
  const handleShowBlockModal = (id, isBlocked) => {
    console.log(id, isBlocked);
    setShowBlockModal(true);
    localStorage.setItem('id', id);
    localStorage.setItem('isBlocked', isBlocked);
  };

  async function blockOrUnblock() {
    let uId = localStorage.getItem('id');
    const blockValue = localStorage.getItem('isBlocked');
    blockOrUnblockAdmin(uId, blockValue, data.accessToken).then((data) => {
      console.log('117', data);
      toast.success('Success');
      preload();
    });
    setShowBlockModal(false);
    localStorage.removeItem('isBlocked');
    localStorage.removeItem('id');
  }

  // Preload Admin Function
  const preload = () => {
    adminListData(data.accessToken, checkBoxValue, adminType)
      .then((data) => {
        setAdminData(data.data.rows);
        setFilterData(data.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FILTER
  const applyFilter = () => {
    preload();
    setShowFilterModal(false);
    setCheckbox('');
    setAdminType('');
    console.log(checkBox, adminType, 'after clearing the state in preload');
  };

  // Handle adminType dropdown
  const handleAdminType = (name) => (event) => {
    setAdminType(event.target.value);
  };

  console.log(adminType, '2222');

  const clearFilter = (e) => {
    setCheckbox('');
    console.log(adminType, 'Before Delete');

    setAdminType('');

    console.log(adminType, 'After Delete');

    setShowFilterModal(false);

    preload();
  };

  // const preload2 = () => {
  //   adminData.map((individualData, index) => {
  //     setAdminPermission(individualData.admin_permissions);
  //     // console.log('adminPermission', adminPermission);

  //     adminPermission.map((individualAdminPermisison, index) => {
  //       setIndividualPermission(individualAdminPermisison);
  //       // console.log(individualPermission,"individualPermission")
  //     });
  //   });
  // };

  // const blockedvalue = localStorage.getItem('isBlocked');

  const colunms = [
    {
      name: (
        <h6>
          <b>ID</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
      grow: 2.5,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.firstName,
      sortable: true,
      grow: 0,
    },
    {
      name: (
        <h6>
          <b>Last Name</b>
        </h6>
      ),
      selector: (row) => row.lastName,
      sortable: true,
      grow: 0,
    },
    {
      name: (
        <h6>
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
      grow: 1.5,
    },
    // {
    //   name: (
    //     <h6>
    //       <b>Image</b>
    //     </h6>
    //   ),
    //   selector: (row) =>
    //     row.image ? (
    //       <img
    //         alt=""
    //         width={80}
    //         height={50}
    //         style={{ objectFit: "cover", border: "1px solid" }}
    //         src={`http://localhost:3002/${row.image}`}
    //       />
    //     ) : (
    //       <img
    //         alt=""
    //         width={80}
    //         height={50}
    //         style={{ objectFit: "cover", border: "1px solid" }}
    //         src=""
    //         // src={profilelogo}
    //       />
    //     ),
    //   sortable: true,
    // },
    {
      name: (
        <h6>
          <b>Access</b>
        </h6>
      ),
      selector: (row) => [
        row.admin_permissions[0]?.adminManagement == 1 ? (
          <span class="bg-red-200 text-red-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            Admin
          </span>
        ) : (
          ''
        ),
        row.admin_permissions[0]?.dashboard == 1 ? (
          <span class="bg-cyan-200 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            Dashboard
          </span>
        ) : (
          ''
        ),
        row.admin_permissions[0]?.notificationManagement == 1 ? (
          <span class="bg-green-200 text-green-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            Notification
          </span>
        ) : (
          ''
        ),
        row.admin_permissions[0]?.userManagement == 1 ? (
          <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            User Management
          </span>
        ) : (
          ''
        ),
        row.admin_permissions[0]?.systemConfiguration == 1 ? (
          <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            System Configuration
          </span>
        ) : (
          ''
        ),
        row.admin_permissions[0]?.reportManagement == 1 ? (
          <span class="bg-[#03C9D7] text-white text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">
            Report
          </span>
        ) : (
          ''
        ),
      ],

      grow: 4,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) =>
        row.id === userId ? (
          ''
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '110px',
            }}
          >
            {/* EDIT */}
            <button
              style={{ border: 'none', background: 'none' }}
              onClick={() => navigate(`/editadmin/${row.id}`)}
            >
              <i
                className="fa-solid fa-pen fa-lg"
                // style={{ color: "#001f4d" }}
              ></i>
            </button>

            {/* DELETE */}
            <button
              style={{ border: 'none', background: 'none' }}
              onClick={() => handleShow(row.id)}
            >
              <i
                className="fa-regular fa-trash-can fa-lg"
                // style={{ color: '#242B2E' }}
              ></i>
            </button>

            {/* BLOCK */}
            <button
              style={{ border: 'none', background: 'none' }}
              onClick={() => handleShowBlockModal(row.id, row.isBlocked)}
            >
              {row.isBlocked == 0 ? (
                <i
                  className="fa-sharp fa-solid fa-check fa-lg"
                  style={{ color: '#3DBE29' }}
                ></i>
              ) : (
                <i
                  class="fa-sharp fa-solid fa-xmark fa-lg"
                  style={{ color: '#E21717' }}
                ></i>
              )}
            </button>
          </div>
        ),
      grow: 2,
    },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: 'Total',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  useEffect(() => {
    preload();
  }, []);
  /* 
  useEffect(() => {
    clearFilter();
  }, [checkBox]);
 */
  useEffect(() => {
    const result = adminData.filter((value) => {
      return (
        value.firstName.toLowerCase().match(search.toLowerCase()) ||
        value.email.toLowerCase().match(search.toLowerCase()) ||
        value.lastName.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/admindetails/${row.id}`);
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
        }  rounded-3xl`}
      >
        <Header category="Page" title="Admin" data={adminData} />
        <div style={{ float: 'right' }} className="mr-6">
          <FiFilter
            size={25}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowFilterModal(true)}
          />
        </div>
        <DataTable
          columns={colunms}
          data={filterData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          onRowClicked={handleRowClicked}
          selectableRowsHighlight
          highlightOnHover
          pointerOnHover
          subHeader
          theme={currentMode === 'Dark' ? 'dark' : 'light'}
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              className={`${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'form-control'
              } `}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px' }}
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
                      onClick={deleteAdmin}
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

        {showBlockModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Confirmation</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowBlockModal(false);
                        localStorage.removeItem('isBlocked');
                      }}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative p-6 flex-auto">
                    {localStorage.getItem('isBlocked') == 0 ? (
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Are you sure, you want to block this user?
                      </p>
                    ) : (
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Are you sure, you want to Unblock this user?
                      </p>
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={blockOrUnblock}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowBlockModal(false);
                        localStorage.removeItem('isBlocked');
                      }}
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

        {showFilterModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Filter</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowFilterModal(false);
                      }}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative p-6 flex-auto">
                    {/* <label for="underline_select" >
                      Admin Type
                    </label> */}
                    <div class="mb-3 xl:w-full ">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2 "
                        for=""
                      >
                        Admin Type
                      </label>
                      <select
                        class="form-select w-full appearance-non block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label=""
                        onChange={handleAdminType('adminType')}
                      >
                        <option value=""></option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="SUB_ADMIN">Sub Admin</option>
                      </select>
                    </div>

                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                      Admin Access
                    </label>

                    <div className="flex justify-between mb-2.5 gap-28">
                      <div class="flex flex-col">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            id="dashboard"
                            // value={checkBox}
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
                            name="dashboard"
                          />
                          <label
                            class="form-check-label mr-1.5 mb-2 inline-block text-gray-800 opacity-50"
                            for="inlineCheckbox1"
                          >
                            Dashboard
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            id="report"
                            value={checkBox}
                            name="reportManagement"
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
                            // onClick={test}
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
                            // value={checkBox}
                            name="userManagement"
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
                            // onClick={test}
                          />
                          <label
                            class="form-check-label mr-1.5 mb-2 inline-block text-gray-800 opacity-50 "
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
                            // value={checkBox}
                            name="adminManagement"
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
                            // onClick={test}
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
                            // value={checkBox}
                            name="notificationManagement"
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
                            // onClick={test}
                          />
                          <label
                            class="form-check-label mr-1.5 mb-2 inline-block text-gray-800 opacity-50"
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
                            // value={checkBox}
                            name="systemConfiguration"
                            // onChange={handleCheckBox}
                            onChange={(e) => setCheckbox(e.target.name)}
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
                  </div>
                  {/*footer*/}
                  <div className="flex justify-between items-center w-full p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className=" bg-black text-white w-1/2 font-bold uppercase px-6 py-2 text-sm outline-none rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={applyFilter}
                    >
                      Apply
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600  w-1/2 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      // onClick={() => {
                      //   setCheckbox("")
                      //   setShowFilterModal(false)
                      //   filter()
                      // }}
                      onClick={clearFilter}
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* ADD Button */}
        <button
          title="Add"
          class="fixed z-90 bottom-24 right-3.5 bg-[#1A97F5] w-14 h-14 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-3xl"
          onClick={() => navigate('/addAdmin')}
        >
          +
        </button>
      </div>
    </>
  );
};

export default AdminTable;
