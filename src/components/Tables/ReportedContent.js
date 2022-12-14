import React, { useEffect, useState } from 'react';

// React Table
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
import { reportedContentListData } from '../../helper/Table/TableHelper';

const ReportedContent = () => {
  // Context
  const { currentMode } = useStateContext();

  const navigate = useNavigate();
  const { data } = isAuthenticated();

  const [search, setSearch] = useState('');
  const [contentData, setContentData] = useState([]);
  const [filterData, setFilterData] = useState([]);


  const reportContent = () => {
    reportedContentListData(data.accessToken)
      .then((data) => {
        console.log('responseeee', data);
        setContentData(data.data.data.rows);
        setFilterData(data.data.data.rows);
        console.log('THIS IS DATA', data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Item Type</b>
        </h6>
      ),
      selector: (row) => row.itemType,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported By</b>
        </h6>
      ),
      selector: (row) => [row.user.firstName],
      sortable: true,
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

  useEffect(() => {
    reportContent();
  }, []);

  console.log(contentData, 'contentData888888');

  useEffect(() => {
    console.log(contentData, 'contentData');
    const result = contentData.filter((value) => {
      return (
        value.itemType.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase()) ||
        value.description.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);
  // console.log(admin);

  const handleRowClicked = (row) => {
    navigate(`/viewReportedContent/${row.id}`);
  };

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 ${
        currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
      }  rounded-lg`}
    >
      <Header category="Page" title="Reported Content" />
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
    </div>
  );
};

export default ReportedContent;
