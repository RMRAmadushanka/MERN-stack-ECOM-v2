import axios from "axios";


export const createOrUpdateUser = async (authToken) => {
    return await axios.post(
      'http://localhost:4000/api/create-or-update-user',
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  };

  export const currentUser = async (authToken) => {
    return await axios.post(
      'http://localhost:4000/api/current-user',
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  };