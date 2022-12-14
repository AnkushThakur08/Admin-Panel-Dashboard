import axios from 'axios';
import { API } from '../../backend';

// GET INDIVIDUAL REPORTED CONTENT DATA
export const reportedContentIndividualData = async (id, token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/reportedItems/detail/${id}`, {
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

// UPDATE INDIVIDUAL REPORTED CONTENT DATA
export const updateReportedContent = async (id, token, formData, values) => {
  console.log(values.itemType, 3333333);
  return fetch(`${API}admin/v1/reportedItems/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    //  data: formData
    body: JSON.stringify({
      status: formData.status,
      description: formData.Description,
      id: id,
      itemType: values.itemType
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};