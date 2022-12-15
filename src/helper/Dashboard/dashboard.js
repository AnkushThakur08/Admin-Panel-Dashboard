import { API } from '../../backend';

export const getAllUser = async () => {
  console.log(API);
  return await fetch(`${API}admin/v1/common/dashboard`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};