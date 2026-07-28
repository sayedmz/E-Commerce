import React, { useEffect } from "react";
import { USERS, baseURL } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import Logout from "../Auth/Logout";
const Users = () => {
  const cookie = Cookie();
  useEffect(() => {
    axios
      .get(`${baseURL}/${USERS}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("commerce"),
        },
      })

      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h2>Users page</h2>
      <Logout />
    </>
  );
};

export default Users;
