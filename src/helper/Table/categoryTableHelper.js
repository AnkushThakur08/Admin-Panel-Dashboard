import { API } from '../../backend';
import axios from 'axios';

// GET INDIVIDUAL CATEGORY DATA
export const categoryIndividualData = async (token, id) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/categories/detail/${id}`, {
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

// Create Category
export const createCategory = async (token, category) => {
  console.log('TOKEN', token);
  console.log('CATEGORY', category);
  return await fetch(`${API}admin/v1/categories/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: category.name,
      image: category.image.name,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Update Category
export const updateCategory = async (token, id, category) => {
  console.log(token, id);
  return await fetch(`${API}admin/v1/categories/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      name: category.name,
      image: category.image,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// BLOCK OR UNBLOCK CATEGORIES
export const blockOrUnblockCategories = async (id, isBlocked, token) => {
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

// DELETE CATEGORY
export const deleteCategoryData = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/categories`, {
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
