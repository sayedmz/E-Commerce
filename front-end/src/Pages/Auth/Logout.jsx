import axios from "axios";
import React from "react";
import { LOGOUT, baseURL } from "../../Api/Api";
import Cookie from "cookie-universal";
const Logout = () => {
  //cookie
  const cookie = Cookie();
  async function handleLogout() {
    try {
      const res = await axios.get(`${baseURL}/${LOGOUT}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("commerce"),
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout Page</button>;
};

export default Logout;
