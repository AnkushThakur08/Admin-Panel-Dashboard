import React, { useEffect, useState } from 'react';

// React Data Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import {
  getNotificationData,
  deleteNotificationData,
} from '../../helper/Table/notificationTableHelper';
import { blockOrUnblockAdmin } from '../../helper/Table/adminTableHelper';

const NotificationTable = () => {
  // Context
  const { currentMode, currentColor } = useStateContext();

  // Authorization
  const { data } = isAuthenticated();

  const userId = data.adminDetails.id;

  // Navigate
  const navigate = useNavigate();

  // STATE
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  // DELETE MODAL
  const handleShow = (id) => {
    setshowDeleteModal(true);
    localStorage.setItem('notificationId', id);
  };

  async function deleteNotification() {
    let uId = localStorage.getItem('notificationId');
    console.log('UID', uId);
    deleteNotificationData(data.accessToken, uId).then((result) => {
      console.log(result);
      toast('Deletion successful.');
      preload();
    });
    setshowDeleteModal(false);
    localStorage.removeItem('notificationId');
  }

  // BLOCK MODAL
  const handleShowBlockModal = (id, isBlocked) => {
    console.log(id, isBlocked);
    setShowBlockModal(true);
    localStorage.setItem('NotificationID', id);
    localStorage.setItem('isBlocked', isBlocked);
  };

  async function blockOrUnblock() {
    let uId = localStorage.getItem('NotificationID');
    const blockValue = localStorage.getItem('isBlocked');
    blockOrUnblockNotification(uId, blockValue, data.accessToken).then(
      (data) => {
        console.log('117', data);
        toast.success('Success');
        preload();
      }
    );
    setShowBlockModal(false);
    localStorage.removeItem('isBlocked');
    localStorage.removeItem('NotificationID');
  }

  // Preload Admin Function
  const preload = (event) => {
    getNotificationData(data.accessToken)
      .then((data) => {
        console.log('true');
        console.log(data, 'data');
        setNotificationData(data.data.rows);
        setFilterData(data.data.rows);
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
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.title,
      sortable: true,
      // grow: 0,
    },
    {
      name: (
        <h6>
          <b>Message</b>
        </h6>
      ),
      selector: (row) => row.message,
      sortable: true,
      // grow: 0,
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
            {/*  <button
              style={{
                border: 'none',
                background: 'none',
                paddingRight: '0px',
                marginRight: '0px',
              }}
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
            </button> */}
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
    const result = notificationData.filter((value) => {
      return (
        value.title.toLowerCase().match(search.toLowerCase()) ||
        value.message.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/ViewNotification/${row.id}`);
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 mr-0 pr-0 ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
        } rounded-lg`}
      >
        <Header category="Table" title="Notification" data={notificationData} />

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
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none 
                ${
                  currentMode === 'Dark'
                    ? 'bg-[#424242] text-white'
                    : 'bg-white'
                }
                `}
                >
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
                    <p className="my-4 text-lg leading-relaxed">
                      Are you sure, you want to delete this record?
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={deleteNotification}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setshowDeleteModal(false);
                        localStorage.removeItem('notificationId');
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

        {showBlockModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none 
                 ${
                   currentMode === 'Dark'
                     ? 'bg-[#424242] text-white'
                     : 'bg-white'
                 }
                focus:outline-none`}
                >
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
                      <p className="my-4  text-lg leading-relaxed">
                        Are you sure, you want to block this Notification?
                      </p>
                    ) : (
                      <p className="my-4  text-lg leading-relaxed">
                        Are you sure, you want to Unblock this Notification?
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
                        localStorage.removeItem('NotificationID');
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

        {/* ADD Button */}
        <button
          title="Add"
          className="fixed z-90 bottom-24 right-3.5 bg-[#1A97F5] w-14 h-14 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-3xl"
          onClick={() => navigate('/addNotification')}
          style={{ backgroundColor: `${currentColor}` }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default NotificationTable;
