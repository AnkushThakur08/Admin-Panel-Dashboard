import React, { useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';

// React Router
import { useNavigate, Link } from 'react-router-dom';

// API
import { getAllUser } from '../helper/Dashboard/dashboard';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Dashboard = () => {
  // Context
  const { currentColor, currentMode } = useStateContext();

  const navigate = useNavigate();

  // BLOCK & UnBlock User
  const [values, setValues] = useState({
    datas: [],
  });

  //  Total User Device Data
  const [deviceData, getDeviceData] = useState([]);

  //   Total Login Type
  const [loginType, setLoginType] = useState([]);

  // reported Bug
  const [bugs, getBugs] = useState([]);

  // reported Item
  const [items, setItems] = useState([]);

  //   Function
  const preload = async () => {
    await getAllUser().then((data) => {
      //   console.log(data);
      //   console.log(data.data.activeUsers.items);
      if (data.statusCode == 400) {
        toast.error(data.message);
        setValues({ ...values });
      } else {
        console.log(data.data);
        setValues({ ...values, datas: data.data.activeUsers.items });
        getDeviceData(data.data.signUpByPlatforms.items);
        setLoginType(data.data.signUpByTypes.items);
      }
    });
  };

  const preload2 = async () => {
    await getAllUser().then((data) => {
      //   console.log(data);
      //   console.log(data.data.activeUsers.items);
      if (data.statusCode == 400) {
        toast.error(data.message);
        setValues({ ...values });
      } else {
        console.log(data.data);
        setLoginType(data.data.signUpByTypes.items);
        getBugs(data.data.reportedBugs.items);
        setItems(data.data.reportedItems.items);
      }
    });
  };

  // CHARTS DATA
  const activeUserData = [
    { x: 'Active User', y: values.datas?.[0]?.count },
    { x: 'Blocked user', y: values.datas?.[1]?.count },
  ];

  const totalUserData = [
    { x: 'ANDROID', y: deviceData?.[0]?.count },
    { x: 'WEB', y: deviceData?.[1]?.count },
    { x: 'IOS', y: deviceData?.[2]?.count },
  ];

  const totalLoginType = [{ x: 'Other', y: loginType?.[0]?.count }];

  const bugsReported = [
    { x: 'PENDING', y: bugs?.[0]?.count },
    { x: 'DECLINED', y: bugs?.[1]?.count },
    { x: 'APPROVED', y: bugs?.[2]?.count },
  ];

  const itemsReported = [
    { x: 'Others', y: items?.[0]?.count },
    { x: 'DECLINED', y: items?.[1]?.count },
    { x: 'PENDING', y: items?.[2]?.count },
    { x: 'APPROVED', y: items?.[3]?.count },
  ];

  useEffect(() => {
    preload();
    preload2();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-around ">
        {/* Chart-1 */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 ">
          <div className="w-full ">
            {/* <Link to="/user"> */}
            <Pie
              id="pie-chart1"
              data={activeUserData}
              legendVisiblity
              // legendVisiblity={false}
              height="190px"
            />
            {/* </Link> */}

            <div>
              <div className="flex justify-around mt-5">
                <Link to="/user/Active">
                  <p>Active User : {values.datas?.[0]?.count}</p>
                </Link>

                <Link to="/user/InActive">
                  <p>InActive User : {values.datas?.[1]?.count} </p>
                </Link>
              </div>
            </div>
          </div>

          <hr className="mt-4" />

          <div className="mt-4 flex justify-around text-lg">
            <h1>Total User</h1>
            <h3>{values.datas?.[0]?.count + values.datas?.[1]?.count}</h3>
          </div>
        </div>

        {/* Chart-2 */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 ">
          <div className="w-full">
            <Pie
              id="pie-chart2"
              data={totalUserData}
              legendVisiblity
              // legendVisiblity={false}
              height="190px"
            />
          </div>

          <div>
            <div className="flex justify-around mt-5">
              <p>Android : {deviceData?.[0]?.count}</p>

              <p>IOS : {deviceData?.[1]?.count} </p>
              <p>WEB : {deviceData?.[2]?.count} </p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 flex justify-around text-lg">
            <h1>Total User</h1>
            <h3>
              {deviceData?.[0]?.count +
                deviceData?.[1]?.count +
                deviceData?.[2]?.count}
            </h3>
          </div>
        </div>

        {/* Chart-3 */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 ">
          <div className="w-full">
            <Pie
              id="pie-chart3"
              data={totalLoginType}
              legendVisiblity
              // legendVisiblity={false}
              height="190px"
            />
          </div>
          <div>
            <div className="flex justify-around mt-5">
              <p>Others : {loginType?.[0]?.count}</p>
            </div>
          </div>

          <hr className="mt-4" />
          <div className="mt-4 flex justify-around text-lg">
            <h1>Total User</h1>
            <h3>{loginType?.[0]?.count}</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center mt-4">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  $63,448.78
                </p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div> */}

      <div className="flex flex-wrap justify-center mt-4">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weekly Stats</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div
                key={item.title}
                className="flex justify-between mt-4 w-full"
              >
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="area-sparkLine"
                height="160px"
                type="Area"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">MedicalPro Branding</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-400"
            >
              <IoIosMore />
            </button>
          </div>
          <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
            16 APR, 2021
          </p>

          <div className="flex gap-4 border-b-1 border-color mt-6">
            {medicalproBranding.data.map((item) => (
              <div
                key={item.title}
                className="border-r-1 border-color pr-4 pb-2"
              >
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Teams</p>

            <div className="flex gap-4">
              {medicalproBranding.teams.map((item) => (
                <p
                  key={item.name}
                  style={{ background: item.color }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-md font-semibold mb-2">Leaders</p>
            <div className="flex gap-4">
              {medicalproBranding.leaders.map((item, index) => (
                <img
                  key={index}
                  className="rounded-full w-8 h-8"
                  src={item.image}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Daily Activities</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img className="md:w-96 h-50 " src={product9} alt="" />
            <div className="mt-8">
              <p className="font-semibold text-lg">React 18 coming soon!</p>
              <p className="text-gray-400 ">By Johnathan Doe</p>
              <p className="mt-8 text-sm text-gray-400">
                This will be the small description for the news you have shown
                here. There could be some great info.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS */}

      <div className="flex flex-wrap lg:flex-nowrap justify-evenly ">
        {/* Chart-4 */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 ">
          <div className="w-full">
            <Pie
              id="pie-chart4"
              data={bugsReported}
              legendVisiblity
              // legendVisiblity={false}
              height="190px"
            />
          </div>

          <div>
            <div className="flex justify-around mt-5">
              <p>Pending : {bugs?.[0]?.count}</p>

              <p>Approved : {bugs?.[1]?.count} </p>
              <p>Declined : {bugs?.[2]?.count} </p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 flex justify-around text-lg">
            <h1>Bugs Reported</h1>
            <h3>{bugs?.[0]?.count + bugs?.[1]?.count + bugs?.[2]?.count}</h3>
          </div>
        </div>

        {/* Chart-5 */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 ">
          <div className="w-full">
            <Pie
              id="pie-chart5"
              data={itemsReported}
              legendVisiblity
              // legendVisiblity={false}
              height="190px"
            />
          </div>

          <div>
            <div className="flex justify-around mt-5">
              <p>Oth:{items?.[0]?.count}</p>

              <p>Declined:{items?.[1]?.count} </p>
              <p>Pending:{items?.[2]?.count} </p>
              <p>Approve:{items?.[3]?.count} </p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 flex justify-around text-lg">
            <h1>Reported Item</h1>
            <h3>
              {items?.[0]?.count +
                items?.[1]?.count +
                items?.[2]?.count +
                items?.[3]?.count}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
