import axios from 'axios';
import { API } from '../../backend';

export const deleteAdminData = async (token, id) => {
    return await axios
      .delete(`${API}admin/v1/admin/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data:{
          id: id
        }
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
export const blockOrUnblockAdmin = async(token, id, isBlocked) =>{
  return await axios.put(`${API}admin/v1/admin/block`,{
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`
    },
    data:{
      id: id,
      isBlocked: isBlocked
    }
  }).then((response)=>{
    console.log(response);
    return response;
  }).catch((error)=>{
    console.log(error);
  })
}