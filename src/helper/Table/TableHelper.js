import axios from 'axios';
import { API } from '../../backend';
// import {adminListData} from "../Helper/ApiCall.js"

// Admin list api
export const adminListData = async (token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/admin/list?limit=100&skip=0`, {
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


// user list
export const userListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/users?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log(response.data.data.rows);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// admin achievement
export const achievementListData = async (token) => {
  return await fetch(`${API}admin/v1/achievements/?limit=100&skip=0`, {
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


// app version
export const appVersionListData = async (token) => {
  return await axios
    .get(`${API}api/v1/app-version/appVersion?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

// category
export const categoryListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/categories/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

// reported bugs
export const reportedBugsListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/reportedBugs/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

// reported content
export const reportedContentListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/reportedItems/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
