import axios from 'axios';
import { API } from '../../backend';

export const createNotification = async (token, notification) => {
  console.log('TOKEN', token);
  console.log('notification', notification);
  return await fetch(`${API}admin/v1/notification/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: notification.message,
      title: notification.title,
      platform: notification.platformType,
      image: notification.image.name,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getNotificationData = async (token) => {
  return await fetch(`${API}admin/v1/notification/?limit=100&skip=0`, {
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

export const blockOrUnblockNotification = async (id, isBlocked, token) => {
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

export const deleteNotificationData = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/notification/`, {
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

// GET INDIVIDUAL USER DATA
export const getIndividualNotification = async (id, token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/notification/detail/${id}`, {
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
