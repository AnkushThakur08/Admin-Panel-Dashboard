import React, { useEffect, useState } from 'react';

// React Data Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { adminListData } from '../../helper/Table/TableHelper';
import { deleteAdminData } from '../../helper/Table/adminTableHelper';
import BlockUnblock from '../../pages/PopUps/BlockUnblock';

// Custom CSS
// import "./AdminTable.css"

const AdminTable = () => {
  const { data, token } = isAuthenticated();

  console.log(data.accessToken);
  const userId = data.adminDetails.id;

  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [adminData, setAdminData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [adminPermission, setAdminPermission] = useState([]);
  const [individualPermission, setIndividualPermission] = useState([]);

  console.log('5555555', individualPermission);

  // const [show, setShow] = useState(false);

  const handleClose = () => {
    // setShow(false);
    setShowModal(false);
    localStorage.removeItem('adminId');
  };

  const handleShow = (id) => {
    // setShow(true);
    setShowModal(true);
    localStorage.setItem('adminId', id);
    console.log('Ankush');
  };

  const preload = () => {
    adminListData(data.accessToken)
      .then((data) => {
        setAdminData(data.data.rows);
        setFilterData(data.data.rows);

        preload2();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const preload2 = () => {
    adminData.map((individualData, index) => {
      setAdminPermission(individualData.admin_permissions);
      console.log('adminPermission', adminPermission);

      adminPermission.map((individualAdminPermisison, index) => {
        setIndividualPermission(individualAdminPermisison);
      });
    });
  };

  async function deleteAdmin() {
    let uId = localStorage.getItem('adminId');
    console.log('UID', uId);
    deleteAdminData(data.accessToken, uId).then((result) => {
      console.log(result);
      toast('Deletion successful.');
      preload();
    });
    handleClose();
  }

  async function blockUnblockAdmin(id, isBlocked) {
    <BlockUnblock
      id={id}
      isBlocked={isBlocked}
      showModal="true"
      token={data.accessToken}
    />;
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
        individualPermission.adminManagement == '1' ? (
          <span className="badge bg-secondary access">Admin</span>
        ) : (
          ''
        ),
        individualPermission.dashboard == '1' ? (
          <>
            <span className="badge bg-primary">Dashboard</span>
          </>
        ) : (
          ''
        ),
        individualPermission.userManagement == '1' ? (
          <span className="badge bg-success">User</span>
        ) : (
          ''
        ),
        individualPermission.notificationManagement == '1' ? (
          <>
            <span className="badge bg-danger">Notification</span>
          </>
        ) : (
          ''
        ),
        individualPermission.systemConfiguration == '1' ? (
          <span className="badge bg-info access">System</span>
        ) : (
          ''
        ),
        individualPermission.reportManagement == '1' ? (
          <>
            <span className="badge bg-warning ">Report</span>
          </>
        ) : (
          ''
        ),
      ],

      grow: 1,
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
            <button
              style={{ border: 'none', background: 'none' }}
              // onClick={() => navigate(`/editadmin/${row.uId}`)}
            >
              <i className="fa-solid fa-pen fa-lg"></i>
            </button>
            <button
              style={{ border: 'none', background: 'none' }}
              // onClick={() => deleteAdmin(row.uId)}
              onClick={() => handleShow(row.id)}
              // onClick={() => setShowModal(true)}
            >
              <i className="fa-regular fa-trash-can fa-lg"></i>
            </button>
            <button
              style={{ border: 'none', background: 'none' }}
              onClick={() => blockUnblockAdmin(row.id, row.isBlocked)}
            >
              <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
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

  useEffect(() => {
    preload2();
  }, [preload]);

  useEffect(() => {
    const result = adminData.filter((value) => {
      return (
        value.firstName.toLowerCase().match(search.toLowerCase()) ||
        value.email.toLowerCase().match(search.toLowerCase()) ||
        value.lastName.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);
  // console.log(admin);

  // const handleRowClicked = (row) => {
  //   navigate(`/admindetails/${row.uId}`);
  // };

  return (
    <>
      {showModal ? (
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
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
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
                    onClick={() => setShowModal(false)}
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

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Admin" />
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
                width: '100%',
                padding: '10px',
                border: '1px solid black',
              }}
            />
          }
        />

        {/*  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAdmin}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */}
      </div>
    </>
  );
};

export default AdminTable;
