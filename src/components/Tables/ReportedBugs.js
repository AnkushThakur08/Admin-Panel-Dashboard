import { row } from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import {reportedBugsListData} from '../../helper/Table/TableHelper'

const ReportedBugs = () => {
  // const navigate = useNavigate();
  const { data, token } = isAuthenticated();

  const [search, setSearch] = useState('');
  const [getBugsData, setGetBugsData] = useState([])
  const [filterData, setFilterData] = useState([]);

  // const [show, setShow] = useState(false);

  /*  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  }; */

  /* const handleShow = () => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  }; */

  const preload = () => {
    reportedBugsListData(data.accessToken)
      .then((data) => {
        console.log("NEW",data.data.data.rows); 
        setGetBugsData(data.data.data.rows);
        setFilterData(data.data.data.rows)
      })
      .catch((error) => {
        console.log(error);
      });
  };




  /*  async function deleteAdmin() {
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
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
      grow: 1.5
    },
    {
      name: (
        <h6>
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported By</b>
        </h6> 
      ),
      selector: (row) => [
        row.user.firstName
      ],
      sortable: true

    },
    {
      name: (
        <h6>
          <b>Description</b>
        </h6>
      ),
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Status</b>
        </h6>
      ),
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: 'Total',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

// useEffect(() => {
//   reportBug();
  
// }, [])

// useEffect(() => {
//   preload();
// }, [reportBug])


useEffect(() => {
  let isApiSubscribed = true;
  if(isApiSubscribed){
    preload();
  }
  return () => {
    // cancel the subscription
    isApiSubscribed = false;
};
}, []);


  useEffect(() => {
    const result = getBugsData.filter((value) => {
      return (
        value.id.toLowerCase().match(search.toLowerCase()) ||
        value.title.toLowerCase().match(search.toLowerCase()) ||
        value.user.firstName.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  // const handleRowClicked = (row) => {
  //   navigate(`/admindetails/${row.uId}`);
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Reported Bugs" />
      <DataTable
        // title="Admin"
        columns={colunms}
        data={filterData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        // onRowClicked={handleRowClicked}
        selectableRowsHighlight
        pointerOnHover
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

    </div>
  );
};

export default ReportedBugs;
