import { useState } from 'react';
import axios from 'axios';
import { API } from '../../backend';


export const blockOrUnblockUser = async (id, isBlocked, token) => {
  
    if(isBlocked == 0){
      isBlocked = 1
  
    } else
    {
      isBlocked = 0;
    }
  
    return fetch(`${API}admin/v1/admin/block`, {
      method: "PUT",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
  
  
      body: JSON.stringify({id: id, isBlocked: isBlocked}),
    }).then((response) => {
      return response.json();
  
    }).catch((error) => {
      console.log(error);
    })
  
  }