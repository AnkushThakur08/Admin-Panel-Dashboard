import axios from 'axios';
import { API } from '../../backend';

// ADMIN LIST DATA
export const adminListData = async (token, permission = '', adminType = '') => {
  console.log('permission', permission);
  console.log('ADMINTYPE', adminType);

  if (permission && adminType) {
    // If BOTH ARE THERE
    return await fetch(
      `${API}admin/v1/admin/list?limit=100&skip=0&accessPermissions=${permission}&adminType=${adminType}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Clear Filter
  else if (permission === '' && adminType === '') {
    return await fetch(`${API}admin/v1/admin/list?limit=100&skip=0`, {
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
  }
  // If ONLY CHECKBOXES
  else if (permission) {
    return await fetch(
      `${API}admin/v1/admin/list?limit=100&skip=0&accessPermissions=${permission}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log('HERE!!!!!!');
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // ONLY ADMIN TYPE
  else if (adminType) {
    return await fetch(
      `${API}admin/v1/admin/list?limit=100&skip=0&&adminType=${adminType}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// user list
export const userListData = async (token, value) => {
  // console.log(isBlocked, "isBlockedd")
  if (value === '') {
    return await axios
      .get(`${API}admin/v1/users?limit=1000&skip=0`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.rows);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return await axios
      .get(`${API}admin/v1/users?limit=1000&skip=0&isBlocked=${value}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.rows);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const redirectUserListData = async (token, value) => {
  // console.log(isBlocked, "isBlockedd")
  if (value === 0) {
    return await axios
      .get(`${API}admin/v1/users?limit=1000&skip=0&isBlocked=${value}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.rows);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (value === 1) {
    return await axios
      .get(`${API}admin/v1/users?limit=1000&skip=0&isBlocked=${value}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.rows);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (value === 3) {
    return await axios
      .get(`${API}admin/v1/users?limit=1000&skip=0`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.rows);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// export const redirectActiveUserListData = async (token, value) => {
//   // console.log(isBlocked, "isBlockedd")
//   if (value === 1) {
//     return await axios
//       .get(`${API}admin/v1/users?limit=1000&skip=0&isBlocked=${value}`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data.data.rows);
//         return response;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else {
//     return await axios
//       .get(`${API}admin/v1/users?limit=1000&skip=0&isBlocked=${value}`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data.data.rows);
//         return response;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };

// admin achievement
export const achievementListData = async (token) => {
  return await fetch(`${API}admin/v1/achievements/?limit=100&skip=0`, {
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

// app version
export const appVersionListData = async (token) => {
  return await axios
    .get(`${API}api/v1/app-version/appVersion?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

// category
export const categoryListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/categories/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

// reported bugs
export const reportedBugsListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/reportedBugs/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

// reported content
export const reportedContentListData = async (token) => {
  return await axios
    .get(`${API}admin/v1/reportedItems/?limit=100&skip=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
