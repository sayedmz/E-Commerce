import axios from "axios";
import React, { useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
const Register = () => {
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //loading
  const [loading, setLoading] = useState(false);
  //err
  const [err, setErr] = useState("");
  //cookie
  const cookie = Cookie();
  // handle form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      // cookie.set("commerce", token ,{
      //   httpOnly : true,
      // });
      cookie.set("commerce", token);
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 422) {
        setErr("Email is already been taken.");
      } else {
        setErr("Internal server Err.");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>
              <div className="form-control">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your Name...."
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control">
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email...."
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-control">
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password...."
                  minLength="6"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary">Register</button>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
