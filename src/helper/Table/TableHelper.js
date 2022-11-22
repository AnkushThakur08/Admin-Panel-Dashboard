import axios from 'axios';
import { API } from '../../backend';
// import {adminListData} from "../Helper/ApiCall.js"

// Admin list api
export const adminListData = async () => {
  console.log('hello', API);
  // console.log("tokennnn",token);
  return await axios
    .get(`${API}admin/v1/admin/list?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
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

export const appVersionListData = async () => {
  return await axios
    .get(`${API}api/v1/app-version/appVersion?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`
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

export const categoryListData = async () => {
  return await axios
    .get(`${API}admin/v1/categories/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`
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
export const reportedBugsListData = async () => {
  return await axios
    .get(`${API}/admin/v1/reportedBugs/?limit=10&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`
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
