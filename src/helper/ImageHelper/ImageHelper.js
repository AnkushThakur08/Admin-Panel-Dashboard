import axios from 'axios';
import { API } from '../../backend';

// s3bucket get upload URL
export const getSignedURL = async (token, data) => {
    console.log(token, "doirectory", data.directory);
    return await fetch(`${API}admin/v1/common/getSignedURL`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        directory: "admin/",
        fileName: data.image.name,
        contentType: data.image.type
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };
  


  export const AWSput = async (token, data ,key, AWSURL) => {
    console.log(token, AWSURL,key, "doirectory", data.directory);
    return await fetch(`${AWSURL}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'image/png',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileName: data,
        key: key
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };