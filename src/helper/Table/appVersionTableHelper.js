import axios from 'axios';
import { API } from '../../backend';

export const getAppVersionIndividualDetail = async (id, token) => {
  return await fetch(
    `${API}admin/v1/systemConfiguration/appVersion/detail/${id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      consoel.log(error);
    });
};

export const createAppVersion = async (token, appData) => {
  console.log(token, appData);
  return await fetch(`${API}admin/v1/systemConfiguration/appVersion`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: appData.name,
      version: appData.version,
      minimumVersion: appData.minVersion,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const updateAppVersion = async (token, id, appData) => {
  console.log(token, id, appData);
  return await fetch(`${API}admin/v1/systemConfiguration/appVersion`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      name: appData.name,
      version: appData.version,
      minimumVersion: appData.minVersion,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
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
