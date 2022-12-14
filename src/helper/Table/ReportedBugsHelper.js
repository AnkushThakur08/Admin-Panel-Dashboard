import {API} from "../../backend";
import axios from 'axios';

// GET INDIVIDUAL REPORTED BUG DATA
export const reportedBugsIndividualData = async (id, token) => {
    console.log(API);
    console.log(token);
    return await fetch(`${API}admin/v1/reportedBugs/detail/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

// UPDATE INDIVIDUAL REPORTED BUG DATA
export const updateReportedBug = async (id, token, formData) => {
    console.log(formData, token, 3333333);
    return fetch(`${API}admin/v1/reportedBugs/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  
      //  data: formData
      body: JSON.stringify({
        status: formData.status,
        image: formData.image.name,
        description: formData.Description,
        id: id
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };