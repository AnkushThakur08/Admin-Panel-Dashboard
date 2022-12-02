import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React-Router-DOM
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// COomponents
import { Header } from '../../components';

// API
import { userListData } from '../../helper/Table/TableHelper';
import { blockOrUnblockUser } from '../../helper/Table/userTableHelper';
import { isAuthenticated } from '../../helper/login/loginHelper';

const UserTable = () => {
  // const navigate = useNavigate();
  const { data, token } = isAuthenticated();
  const [showBlockModal, setShowBlockModal] = useState(false);

  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const blockedvalue = localStorage.getItem('isBlocked');

  // const [show, setShow] = useState(false);

  // const handleClose = () => {
  //   setShow(false);
  //   localStorage.removeItem("adminId");
  // };
  // const handleShow = () => {
  //   setShow(true);
  //   localStorage.setItem("adminId", adminId);
  // };

  const handleShowBlockModal = (id, isBlocked) => {
    console.log(id, isBlocked);
    setShowBlockModal(true);
    localStorage.setItem('id', id);
    localStorage.setItem('isBlocked', isBlocked);
  };

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
          <button
            style={{ border: 'none', background: 'none' }}
            // onClick={() => deleteAdmin(row.uId)}
            // onClick={() => handleShow(row.uId)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
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
  // console.log(admin);

  // const handleRowClicked = (row) => {
  //   navigate(`/admindetails/${row.uId}`);
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="User" />
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
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            className="  form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px' }}
          />
        }
      />

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
                  {blockedvalue == 0 ? (
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
