import { useState } from "react";
import axios from "axios";
import { API } from "../../backend";

// EDIT ADMIN
export const editAdmin = async (id, formData, token) => {
  console.log(formData, token, 3333333);
  return fetch(`${API}admin/v1/admin/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    //  data: formData
    body: JSON.stringify({
      id: formData.id,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      adminType: formData.adminType,
      accessPermissions: formData.admin_permissions,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

// GET INDIVIDUAL ADMIN DATA
export const adminIndividualData = async (id, token) => {
  console.log(API);
  console.log(token);
  return await fetch(`${API}admin/v1/admin/adminDetail/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

// ADD ADMIN
export const addAdmin = async (formData, token) => {
  console.log(formData,formData.adminType, token, 3333333);
  return fetch(`${API}admin/v1/admin/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      adminType: formData.adminType,
      accessPermissions: formData.admin_permissions,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

// ADMIN PROFILE UPDATE
export const adminProfileUpdate = async (formData, token) => {
  console.log(formData, formData.image.name , token, 3333333);
  return fetch(`${API}admin/v1/admin/edit-profile/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      image: formData.image.name
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};


// CHANGE ADMIN PASSWORD
export const changePassword = async (formData, token) => {
  console.log(formData, token, 3333333);
  return fetch(`${API}admin/v1/admin/profile/change-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      oldPassword: formData.oldPassword,
      password: formData.newPassword,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};