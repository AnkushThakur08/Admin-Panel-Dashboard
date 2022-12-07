import React, { useEffect, useState } from "react";

// REACT ROUTER DOM
import { Link, useParams } from "react-router-dom";

// HEADER COMPONENT
import { Header } from "../../components";

// DATE FORMATTER

import moment from "moment-js";

//REACT ICONS
import { IoIosArrowBack } from "react-icons/io";

// HELPER FILES
import { isAuthenticated } from "../../helper/login/loginHelper";
import { userIndividualData } from "../../helper/Table/userTableHelper";

const UserDetails = () => {
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
    phoneNumber: "",
    createdAt: "",
  });

  // DESTRUCTURE
  const { firstName, lastName, email, phoneNumber, createdAt } = values;

  // GETTING INDIVIDUAL USER DATA
  const preload = () => {
    userIndividualData(ID, data.accessToken)
      .then((data) => {
        setValues({
          ...values,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          gender: data.data.gender,
          phoneNumber: data.data.phoneNumber,
          createdAt: data.data.createdAt,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Link to="/user">
        <IoIosArrowBack size={25} className="mb-3" />
      </Link>
      <Header category="Details" title="User Details" />
      <div className="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div className="px-6 pt-4 pb-2">
          <table className="border-none ">
            <tbody>
              <tr>
                <td className="border-none pr-32  py-2">First Name</td>
                <td className="border-none text-gray-900">{firstName}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Last Name</td>
                <td className="border-none text-gray-900">{lastName}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Email</td>
                <td className="border-none text-gray-900">{email}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Phone Number</td>
                <td className="border-none text-gray-900">{phoneNumber}</td>
              </tr>
              <tr>
                <td className="border-none pr-32 py-2">Created At</td>
                <td className="border-none text-gray-900">
                  {moment(createdAt).format()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
