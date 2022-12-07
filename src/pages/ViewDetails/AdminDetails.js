import React, { useEffect, useState } from "react";

// REACT ROUTER DOM
import { useParams } from "react-router-dom";

// HEADER COMPONENT
import { Header } from "../../components";

//REACT ICONS
import { IoIosArrowBack } from "react-icons/io";

// HELPER FILES
import { isAuthenticated } from "../../helper/login/loginHelper";
import { adminIndividualData } from "../../helper/adminHelper/admin";

const AdminDetails = () => {
  // PARAMS
  const params = useParams();
  const ID = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adminType: "",
    permission: [],
    isBlocked: "",
  });

  const { firstName, lastName, email, adminType, permission, isBlocked } =
    values;

  const preload = () => {
    //   console.log(userid);
    adminIndividualData(ID, data.accessToken)
      .then((data) => {
        setValues({
          ...values,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          adminType: data.data.adminType,
          permission: data.data.admin_permissions[0],
          isBlocked: data.data.isBlocked,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(permission, "5555555555");
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Details" title="Admin Details" />
      <div class="max-w-full rounded overflow-hidden shadow-lg pb-10">
        {/* <div class="px-6 py-4">
          <span></span>
        </div> */}
        <div class="px-6 pt-4 pb-2">
          <table class="border-none ">
            <tbody>
              <tr >
                <td class="border-none pr-32  py-2">First Name</td>
                <td class="border-none">{firstName}</td>
              </tr>
              <tr >
                <td class="border-none pr-32 py-2">Last Name</td>
                <td class="border-none">{lastName}</td>
              </tr>
              <tr >
                <td class="border-none pr-32 py-2">Email</td>
                <td class="border-none">{email}</td>
              </tr>
              <tr >
                <td class="border-none pr-32 py-2">Admin Type</td>
                <td class="border-none">{adminType}</td>
              </tr>
              <tr>
                <td class="border-none pr-32 py-2">Status</td>
                {isBlocked == 1 ? (
                  <td class="border-none">
                    <span class="bg-[#03C9D7] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                      Block
                    </span>
                  </td>
                ) : (
                  <td class="border-none">
                    <span class="bg-[#03C9D7] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                      Active
                    </span>
                  </td>
                )}
              </tr>
              <tr>
                <td class="border-none py-3">Admin Access</td>
                <td class="border-none">
                  <div>
                    {permission.dashboard == 1 ? (
                      <span class="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        Dashboard
                      </span>
                    ) : (
                      ""
                    )}
                    {permission.userManagement == 1 ? (
                      <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        User Management
                      </span>
                    ) : (
                      ""
                    )}
                    {permission.adminManagement == 1 ? (
                      <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        Admin Management
                      </span>
                    ) : (
                      ""
                    )}
                    {permission.notificationManagement == 1 ? (
                      <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        Notification
                      </span>
                    ) : (
                      ""
                    )}
                    {permission.systemConfiguration == 1 ? (
                      <span class="bg-[#03C9D7] text-white-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        System Configuration
                      </span>
                    ) : (
                      ""
                    )}
                    {permission.reportManagement == 1 ? (
                      <span class="bg-[#03C9D7] text-white-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        Report Management
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
