import axios from 'axios';
import { API } from '../../backend';

export const deleteAdminData = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/admin/`, {
      method: 'DELETE',
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

// BLOCK OR UNBLOCK ADMIN
export const blockOrUnblockAdmin = async (id, isBlocked, token) => {
  if (isBlocked == 0) {
    isBlocked = 1;
  } else {
    isBlocked = 0;
  }

  return fetch(`${API}admin/v1/admin/block`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ id: id, isBlocked: isBlocked }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
