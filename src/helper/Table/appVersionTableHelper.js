import axios from 'axios';
import { API } from '../../backend';

export const getAppVersionIndividualDetail = async (token, id) => {
  return fetch(`${API}admin/v1/systemConfiguration/appVersion/detail/${id}`, {
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
      consoel.log(error);
    });
};

export const deleteAppVersion = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/systemConfiguration/appVersion`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      data: {
        id: id,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
