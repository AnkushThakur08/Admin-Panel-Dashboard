import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React-Router-DOM
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// Components
import { Header } from '../../components';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { userListData } from '../../helper/Table/TableHelper';
import { blockOrUnblockUser } from '../../helper/Table/userTableHelper';
import { deleteUserData } from '../../helper/Table/userTableHelper';

const UserTable = () => {
  // Context
  const { currentMode } = useStateContext();

  // Navigation
  const navigate = useNavigate();

  // Authorization
  const { data } = isAuthenticated();

  // STATE
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const blockedvalue = localStorage.getItem('isBlocked');

  // DELETE MODAL
  const handleShowDeleteModal = (id) => {
    console.log(id);
    setShowDeleteModal(true);
    localStorage.setItem('userId', id);
  };

  const deleteUser = () => {
    let uId = localStorage.getItem('userId');
    console.log('UID', uId);
    deleteUserData(data.accessToken, uId).then((result) => {
      console.log(result);
      toast('Deletion successful.');
      preload();
    });
    setShowDeleteModal(false);
    localStorage.removeItem('userId');
  };

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
    blockOrUnblockUser(uId, blockValue, data.accessToken).then((data) => {
      console.log('117', data);
      toast.success('Success');
      preload();
    });
    setShowBlockModal(false);
    localStorage.removeItem('isBlocked');
    localStorage.removeItem('id');
  }

  // Preload User Function
  const preload = () => {
    userListData(data.accessToken)
      .then((data) => {
        console.log('DATA', data.data.data.rows);
        setUserData(data.data.data.rows);
        setFilterData(data.data.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const colunms = [
    {
      name: (
        <h6>
          <b>ID</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>First Name</b>
        </h6>
      ),
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Last Name</b>
        </h6>
      ),
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Contact No</b>
        </h6>
      ),
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
    },
    /*   {
      name: (
        <h6>
          <b>Image</b>
        </h6>
      ),
      selector: (row) =>
        row.image ? (
          <img
            alt=""
            width={80}
            height={50}
            style={{ objectFit: 'cover', border: '1px solid' }}
            src={`http://localhost:3002/${row.image}`}
          />
        ) : (
          <img
            alt=""
            width={80}
            height={50}
            style={{ objectFit: 'cover', border: '1px solid' }}
            src=""
            // src={profilelogo}
          />
        ),
      sortable: true,
    }, */
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '110px',
          }}
        >
          {/* DELETE */}
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => handleShowDeleteModal(row.id)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
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

  useEffect(() => {
    const result = userData.filter((value) => {
      return (
        value.firstName.toLowerCase().match(search.toLowerCase()) ||
        value.email.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/viewUserDetails/${row.id}`);
  };

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 ${
        currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
      }  rounded-3xl`}
    >
      <Header category="Page" title="User" />
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
                  {/*  <button
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
                    onClick={deleteUser}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
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
    </div>
  );
};

export default UserTable;
