import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// REACT ICON
import { FiFilter } from 'react-icons/fi';

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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [itemType, setItemType] = useState('');


  const reportContent = () => {
    reportedContentListData(data.accessToken, itemType)
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

     // FILTER MODAL
     const handleChange = (name) => (event) => {
      setItemType(event.target.value);
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
        value.itemType?.toLowerCase().match(search.toLowerCase()) ||
        value.id?.toLowerCase().match(search.toLowerCase()) ||
        value.description?.toLowerCase().match(search.toLowerCase()) ||
        value.user.firstName?.toLowerCase().match(search.toLowerCase())
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
      <div style={{ float: 'right' }} className="mr-6">
        <FiFilter
          size={25}
          style={{ cursor: 'pointer' }}
          className={`${currentMode === 'Dark' ? 'text-white' : ''}`}
          onClick={() => setShowFilterModal(true)}
        />
      </div>
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

{showFilterModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none 
               ${
                 currentMode === 'Dark' ? 'bg-[#424242] text-white' : 'bg-white'
               }
              `}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Filter</h3>
                  <button
                    className="p-1 ml-auto  border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowFilterModal(false);
                    }}
                  >
                    <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto">
                  {/* <label for="underline_select" >
                      Admin Type
                    </label> */}
                  <div class="mb-3 xl:w-full ">
                    <label class="block text-sm font-bold mb-2 " for="">
                      Item Type
                    </label>
                    <select
                      class={`form-select w-full block  px-3 py-1.5 text-base font-normal 
                      ${
                        currentMode === 'Dark'
                          ? 'bg-[#424242] text-white'
                          : 'text-gray-700'
                      } bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 ${
                        currentMode === 'Dark'
                          ? ' bg-[#424242] text-white focus:text-white focus:bg-[#424242] focus:border-white '
                          : 'focus:text-gray-700 focus:bg-white focus:border-blue-600 '
                      }  focus:outline-none`}
                      aria-label=""
                      onChange={handleChange('itemType')}
                      value={itemType}
                      name="itemType"
                    >
                      <option value="">--Choose--</option>
                      <option value="COMMENT">Comment</option>
                      <option value="POST">Post</option>
                    </select>
                  </div>
                </div>
                {/*footer*/}
                {console.log(itemType)}
                <div className="flex justify-between items-center w-full p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className=" bg-black text-white w-1/2 font-bold uppercase px-6 py-2 text-sm outline-none rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowFilterModal(false);
                      // itemType == 0? preload(0): preload(1) 
                      reportContent()
                      setItemType('');
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600  w-1/2 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // onClick={() => {
                    //   setCheckbox("")
                    //   setShowFilterModal(false)
                    //   filter()
                    // }}
                    onClick={() => {
                      reportContent();
                      setShowFilterModal(false);
                    }}
                  >
                    Clear Filter
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

export default ReportedContent;
