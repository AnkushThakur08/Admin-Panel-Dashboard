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
import { appVersionListData } from '../../helper/Table/TableHelper';
import { isAuthenticated } from '../../helper/login/loginHelper';
import { deleteAppVersion } from '../../helper/Table/appVersionTableHelper';

const AppVersionTable = () => {
  // Navigate
  const navigate = useNavigate();

  // Authorization
  const { data } = isAuthenticated();

  // STATE
  const [search, setSearch] = useState('');
  const [appVersionData, setAppVersionData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // DELETE MODAL
  const handleShowDeleteModal = (id) => {
    console.log(id);
    setShowDeleteModal(true);
    localStorage.setItem('AppID', id);
  };

  const deleteAppVersionData = () => {
    const appId = localStorage.getItem('AppID');
    console.log('APPID', appId);
    deleteAppVersion(data.accessToken, appId).then((result) => {
      console.log(result);
      toast('Deletion Successfully');
      preload();
    });

    setShowDeleteModal(false);
    localStorage.removeItem('AppID');
  };

  // HANDLE ROW CLICK
  const handleRowClick = (row) => {
    navigate(`/viewAppVersion/${row.id}`);
  };

  // Preload App Function
  const preload = () => {
    appVersionListData(data.accessToken)
      .then((data) => {
        console.log('responseeee', data);
        setAppVersionData(data.data.data.rows);
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
        <h6 className="ml-9">
          <b>Action</b>
        </h6>
      ),
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '110px',
          }}
        >
          {/* EDIT */}
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => navigate(`/editappversion/${row.id}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>

          {/* DELETE */}
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => handleShowDeleteModal(row.id)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>

          {/*Block  */}
          {/* <button
            style={{ border: 'none', background: 'none' }}
             onClick={() => blockAdmin(row.uId)}
          >
            <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
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
        onRowClicked={handleRowClick}
        selectableRowsHighlight
        highlightOnHover
        pointerOnHover
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
                    onClick={deleteAppVersionData}
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

      <div className="pb-10">
        <button
          className="fixed right-28 bg-[#333333] text-white rounded-full py-0 px-3 text-4xl mt-5 float-right"
          onClick={() => navigate('/addAppVersion')}
          title="Add"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AppVersionTable;
