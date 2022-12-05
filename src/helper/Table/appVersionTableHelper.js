import axios from 'axios';
import { API } from '../../backend';

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
