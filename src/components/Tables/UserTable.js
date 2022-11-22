import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import axios from 'axios';
import { Header } from '../../components';

// API 
import { userListData } from '../../helper/Table/TableHelper';
import { isAuthenticated } from '../../helper/login/loginHelper';


const UserTable = () => {
  // const navigate = useNavigate();
  const { data, token } = isAuthenticated();
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const [show, setShow] = useState(false);

  // const handleClose = () => {
  //   setShow(false);
  //   localStorage.removeItem("adminId");
  // };
  // const handleShow = () => {
  //   setShow(true);
  //   localStorage.setItem("adminId", adminId);
  // };

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

/*   async function deleteAdmin() {
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
  }
 */
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
  /*   {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) =>
        row.uId === userid ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110px",
            }}
          >
            <button
              style={{ border: "none", background: "none" }}
              // onClick={() => navigate(`/editadmin/${row.uId}`)}
            >
              <i className="fa-solid fa-pen fa-lg"></i>
            </button>
            <button
              style={{ border: "none", background: "none" }}
              // onClick={() => deleteAdmin(row.uId)}
              // onClick={() => handleShow(row.uId)}
            >
              <i className="fa-regular fa-trash-can fa-lg"></i>
            </button>
            <button
              style={{ border: "none", background: "none" }}
              // onClick={() => blockAdmin(row.uId)}
            >
              <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
            </button>
          </div>
        ),
    }, */
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

export default UserTable;
