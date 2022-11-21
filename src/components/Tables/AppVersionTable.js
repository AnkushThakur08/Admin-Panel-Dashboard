import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

// Components
import { Header } from '../../components';

// API
import { appVersionListData } from '../../helper/ApiCall';

const AppVersionTable = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [appVersionData, setAppVersionData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const [show, setShow] = useState(false);

  /* const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  }; */

  /*  const handleShow = () => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  }; */

  appVersionListData()
    .then((data) => {
      console.log('responseeee', data);
      setAppVersionData(data.data.data.rows);
      setFilterData(data.data.data.rows);
      console.log('THIS IS DATA', data);
    })
    .catch((error) => {
      console.log(error);
    });

  /* async function deleteAdmin() {
    let uId = localStorage.getItem("adminId");
    await fetch(`http://localhost:3002/admin/deleteAdmin/${uId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Admin deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        admin();
        handleClose();
      });
    });
  } */

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
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Version</b>
        </h6>
      ),
      selector: (row) => row.version,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Minimum Version</b>
        </h6>
      ),
      selector: (row) => row.minimumVersion,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>CreatedAt</b>
        </h6>
      ),
      selector: (row) => row.createdAt,
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
            // onClick={() => handleShow(row.uId)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
          <button
            style={{ border: 'none', background: 'none' }}
            // onClick={() => blockAdmin(row.uId)}
          >
            <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
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
    appVersionListData();
  }, []);

  useEffect(() => {
    const result = appVersionData.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
        value.minimumVersion.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase())
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
      <Header category="Page" title="App Version" />
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
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid black',
            }}
          />
        }
      />

      {/* <Modal show={show} onHide={handleClose}>
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
  );
};

export default AppVersionTable;
