import axios from 'axios';
import { API } from '../../backend';

export const getIndividualData = async (id, token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/achievements/detail/${id}`, {
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

export const createAdminAchievement = async (token, appData) => {
  console.log(token, appData);
  return await fetch(`${API}admin/v1/achievements/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: appData.name,
      type: appData.type,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const Edit = async (formData, token) => {
  console.log(formData.id, 3333333);
  return fetch(`${API}admin/v1/achievements/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: formData.id,
      name: formData.name,
      type: formData.type,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAchievementData = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/achievements/`, {
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


// ---------------- ACHIEVEMENT LEVEL APIs -----------------------

export const getAchievementLevelData = async (id, token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/achievementLevels?limit=10&skip=0&achievementId=${id}`, {
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

// ADD ADMIN ACHIEVEMENT LEVEL
export const addAchievementLevel = async (token,formData) => {
  console.log(formData,formData.name, token, 3333333);
  return fetch(`${API}admin/v1/achievementLevels`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      name: formData.name,
      achievementId: formData.achievementId
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

// DELETE ACHIEVEMENT LEVEL DATA
export const deleteAchievementLevelData = async (token, id) => {
  return await axios
    .delete(`${API}admin/v1/achievementLevels/`, {
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

// EDIT ACHIEVEMENT LEVEL DATA
export const EditAchievementLevelData = async (formData, token) => {
  console.log(formData.id, 3333333);
  return fetch(`${API}admin/v1/achievementLevels/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: formData.id,
      name: formData.name,
      achievementId: formData.achievementId
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};