import React, { useEffect, useState } from "react";

// REACT ROUTER DOM
import { useParams, Link, useNavigate } from "react-router-dom";

// HEADER COMPONENT
import { Header } from "../../components";

// DATE FORMATTER
import moment from "moment-js";

//REACT ICONS
import { IoIosArrowBack } from "react-icons/io";

// Context
import { useStateContext } from "../../contexts/ContextProvider";

// HELPER FILES
import { isAuthenticated } from "../../helper/login/loginHelper";
import { reportedContentIndividualData } from "../../helper/Table/reportedContentHelper";
import { updateReportedContent } from "../../helper/Table/reportedContentHelper";

// REACT TOASTIFY
import { toast } from "react-toastify";

const ReportedContentDetails = () => {
  // Context
  const { currentMode } = useStateContext();

  // PARAMS
  const params = useParams();
  const id = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    itemType: "",
    Status: "",
    description: "",
    createdAt: "",
  });

  const [updatedValues, setUpdatedValues] = useState({
    status: "",
    Description: "",
  });

  // Destructure
  const { firstName, lastName, itemType, Status, description, createdAt } = values;
  const { status, Description } = updatedValues;

  const preload = () => {
    console.log(id, "id");
    reportedContentIndividualData(id, data.accessToken)
      .then((data) => {
        console.log("DATA", data);

        if (data.message == "success") {
          setValues({
            ...values,
            firstName: data.data.user.firstName,
            lastName: data.data.user.lastName,
            itemType: data.data.itemType,
            Status: data.data.status,
            description: data.data.description,
            createdAt: data.data.createdAt,
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // HandleChange
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    // const data = new FormData();
    // data.append(name, value);
    setValues({ ...values, [name]: value });
    setUpdatedValues({ ...updatedValues, [name]: value });
    console.log("VALUES", value);
  };

  // Update Reported Bug Status
  const onSubmit = (event) => {
    event.preventDefault();
    setUpdatedValues({ ...updatedValues });

    updateReportedContent(id, data.accessToken, updatedValues, values ).then((data) => {
      console.log(data);
      if (data.message == "success") {
        setUpdatedValues({
          ...updatedValues,
          Status: "",
          Description: "",
        });

        toast.success(data.message);
        preload();
      } else {
        toast.error(data.message);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div
      className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
        currentMode === "Dark" ? "bg-[#424242]" : "bg-[#ffffff]"
      }`}
    >
      <Link to="/reportedContent">
        <IoIosArrowBack
          size={25}
          className={`mb-3 ${currentMode === "Dark" ? "text-white" : ""}`}
        />
      </Link>
      <Header category="Details" title="Reported Content Details" />
      <div class="max-w-full rounded overflow-hidden shadow-lg pb-10">
        <div class="px-6 pt-4 pb-2">
          <table class="border-none ">
            <tbody className={`${currentMode === "Dark" ? "text-white" : ""}`}>
              <tr>
                <td class="border-none pr-32  py-2">Reported By</td>
                <td class="border-none">{`${firstName} ${lastName}`}</td>
              </tr>
              <tr>
                <td class="border-none pr-32  py-2">Reported Item</td>
                <td class="border-none">{itemType}</td>
              </tr>
              <tr>
                <td class="border-none pr-32 py-2">Description</td>
                <td class="border-none">{description}</td>
              </tr>

              <tr>
                <td class="border-none pr-32 py-2">status</td>
                <td class="border-none">
                  {Status == "PENDING" ? (
                    <span className="bg-yellow-200 text-yellow-800 text-sm font-medium mr-2 px-2 py-2 rounded ">
                      PENDING
                    </span>
                  ) : (
                    ""
                  )}
                  {Status == "APPROVED" ? (
                    <span className="bg-green-200 text-green-800 text-sm font-medium mr-2 px-2 py-2 rounded ">
                      APPROVED
                    </span>
                  ) : (
                    ""
                  )}
                  {Status == "DECLINED" ? (
                    <span className="bg-red-200 text-red-800 text-sm font-medium mr-2 px-2.5 py-2.5 rounded ">DECLINED</span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td class="border-none pr-32 py-2">Date</td>
                <td class="border-none">{moment(createdAt).format()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form
        className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
          currentMode === "Dark"
            ? "bg-[#424242] text-white"
            : "bg-white text-black"
        }`}
      >
        <div className="flex ">
          <div className="mb-3 w-full ">
            <label className="block  text-sm font-bold mb-2 " for="">
              Status
            </label>
            <select
              class={`form-select appearance-none
                     block
                     w-full
                     px-3
                     py-1.5
                     text-base
                     font-normal
                     border border-solid border-gray-300
                     rounded
                     transition
                     ease-in-out
                     m-0
                    focus:border-white focus:outline-none
                     ${
                       currentMode === "Dark"
                         ? "bg-[#424242] text-white focus:text-white focus:border-white"
                         : "bg-white text-black"
                     }
                   `}
              aria-label="Name"
              onChange={handleChange("status")}
              value={status}
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="DECLINED">DECLINED</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2 " for="Description">
            Description
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
              currentMode === "Dark"
                ? "bg-[#424242] text-white"
                : "bg-white text-black"
            }`}
            id="Description"
            type="text"
            placeholder="Enter"
            onChange={handleChange("Description")}
            value={Description}
          />
        </div>
        <div className="flex ">
          <button
            className="w-full bg-black hover:bg-[#28282B] text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportedContentDetails;
