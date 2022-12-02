import { API } from '../../backend';

// BLOCK OR UNBLOCK ADMIN
export const blockOrUnblockAdmin = async (id, isBlocked, token) => {
  if (isBlocked == 0) {
    isBlocked = 1;
  } else {
    isBlocked = 0;
  }

  return fetch(`${API}admin/v1/categories/blockUnblock`, {
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
