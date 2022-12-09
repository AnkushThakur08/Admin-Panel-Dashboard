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
import { categoryListData } from '../../helper/Table/TableHelper';
import { isAuthenticated } from '../../helper/login/loginHelper';
import { blockOrUnblockCategories } from '../../helper/Table/categoryTableHelper';
import { deleteCategoryData } from '../../helper/Table/categoryTableHelper';

const CategoryTable = () => {
  // Context
  const { currentMode } = useStateContext();

  // Navigate
  const navigate = useNavigate();

  // Authorization
  const { data } = isAuthenticated();

  console.log(data.accessToken);

  // STATE
  const [search, setSearch] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModel, setshowDeleteModal] = useState(false);

  // BLOCK MODEL
  const handleShowBlockModal = (id, isBlocked) => {
    console.log(id, isBlocked);
    setShowBlockModal(true);
    localStorage.setItem('id', id);
    localStorage.setItem('isBlocked', isBlocked);
  };

  async function blockOrUnblock() {
    let userID = localStorage.getItem('id');
    const blockValue = localStorage.getItem('isBlocked');
    blockOrUnblockCategories(userID, blockValue, data.accessToken).then(
      (data) => {
        console.log('117', data);
        toast.success('Success');
        preload();
      }
    );
    setShowBlockModal(false);
    localStorage.removeItem('isBlocked');
    localStorage.removeItem('id');
  }

  // DELETE CATEGORY
  const handleShow = (id) => {
    setshowDeleteModal(true);
    localStorage.setItem('categoryId', id);
  };

  async function deleteCategory() {
    let ID = localStorage.getItem('categoryId');
    console.log('ID', ID);
    deleteCategoryData(data.accessToken, ID).then((result) => {
      console.log(result, '78');
      toast(result.data.message);
      preload();
    });
    setshowDeleteModal(false);
    localStorage.removeItem('categoryId');
  }

  // Handle Row Click
  const handleRowClicked = (row) => {
    navigate(`/viewCategory/${row.id}`);
  };

  // Preload Category Function
  const preload = () => {
    categoryListData(data.accessToken)
      .then((data) => {
        console.log('responseeee', data);
        setCategoryData(data.data.data.rows);
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
          <b>Created At</b>
        </h6>
      ),
      selector: (row) => row.createdAt,
      sortable: true,
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
      selector: (row) => (
        // row.uId === userid ? (
        //   ""
        // ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '110px',
          }}
        >
          {/* EDIT */}
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => navigate(`/editCategory/${row.id}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => handleShow(row.id)}
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
      // ),
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
    const result = categoryData.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
        value.createdAt.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);
  // console.log(admin);

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 ${
        currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-[#ffffff]'
      }  rounded-3xl`}
    >
      <Header category="Table" title="Category" />
      <DataTable
        columns={colunms}
        data={filterData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        onRowClicked={handleRowClicked}
        pointerOnHover
        selectableRowsHighlight
        highlightOnHover
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
      {showDeleteModel ? (
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
                  <p className="my-4  text-lg leading-relaxed">
                    Are you sure, you want to delete this record?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteCategory}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setshowDeleteModal(false)}
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
                    <p className="my-4 text-lg leading-relaxed">
                      Are you sure, you want to block this user?
                    </p>
                  ) : (
                    <p className="my-4  text-lg leading-relaxed">
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

      {/* ADD Button */}
      <button
        title="Add"
        class="fixed z-90 bottom-24 right-3.5 bg-[#1A97F5] w-14 h-14 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-3xl"
        onClick={() => navigate('/addCategory')}
      >
        +
      </button>
    </div>
  );
};

export default CategoryTable;
