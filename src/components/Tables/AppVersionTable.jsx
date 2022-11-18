import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import axios from "axios";
import { Header } from "../../components";

const AppVersionTable = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [appVersionData, setAppVersionData] = useState([]);
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

  const appVersion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/List?limit=100&skip=0"
      );
      console.log(response);

      setAppVersionData(response.data.data.rows);
      setFilterData(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  // async function deleteAdmin() {
  //   let uId = localStorage.getItem("adminId");
  //   await fetch(`http://localhost:3002/admin/deleteAdmin/${uId}`, {
  //     method: "DELETE",
  //   }).then((result) => {
  //     result.json().then((resq) => {
  //       toast.success("Admin deleted successfully", {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //       admin();
  //       handleClose();
  //     });
  //   });
  // }

  const colunms = [
    {
      name: (
        <h6>
          <b>ID</b>
        </h6>
      ),
      selector: (row) => row.uId,
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
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.role,
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
    {
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
            style={{ objectFit: "cover", border: "1px solid" }}
            src={`http://localhost:3002/${row.image}`}
          />
        ) : (
          <img
            alt=""
            width={80}
            height={50}
            style={{ objectFit: "cover", border: "1px solid" }}
            src=""
            // src={profilelogo}
          />
        ),
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Access</b>
        </h6>
      ),
      selector: (row) => [
        row.dashBoardPermission == "1" ? (
          <span className="badge bg-secondary access">Dashboard</span>
        ) : (
          ""
        ),
        row.userManagementPermission == "1" ? (
          <>
            <span className="badge bg-primary">User</span>
          </>
        ) : (
          ""
        ),
        row.AdminPermission == "1" ? (
          <span className="badge bg-success">Admin</span>
        ) : (
          ""
        ),
        row.NotificationPermission == "1" ? (
          <>
            <span className="badge bg-danger">Notification</span>
          </>
        ) : (
          ""
        ),
        row.systemConfigPermission == "1" ? (
          <span className="badge bg-info access">System</span>
        ) : (
          ""
        ),
        row.reportPermission == "1" ? (
          <>
            <span className="badge bg-warning ">Report</span>
          </>
        ) : (
          ""
        ),
      ],
      grow: 1,
      sortable: true,
    },
    // {
    //   name: (
    //     <h6>
    //       <b>Action</b>
    //     </h6>
    //   ),
    //   selector: (row) =>
    //     row.uId === userid ? (
    //       ""
    //     ) : (
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           width: "110px",
    //         }}
    //       >
    //         <button
    //           style={{ border: "none", background: "none" }}
    //           // onClick={() => navigate(`/editadmin/${row.uId}`)}
    //         >
    //           <i className="fa-solid fa-pen fa-lg"></i>
    //         </button>
    //         <button
    //           style={{ border: "none", background: "none" }}
    //           // onClick={() => deleteAdmin(row.uId)}
    //           // onClick={() => handleShow(row.uId)}
    //         >
    //           <i className="fa-regular fa-trash-can fa-lg"></i>
    //         </button>
    //         <button
    //           style={{ border: "none", background: "none" }}
    //           // onClick={() => blockAdmin(row.uId)}
    //         >
    //           <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
    //         </button>
    //       </div>
    //     ),
    // },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  useEffect(() => {
    appVersion();
  }, []);

  useEffect(() => {
    const result = adminData.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
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
            style={{ width: "100%", padding: "10px" }}
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
