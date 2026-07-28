import axios from "axios";
import React, { useState } from "react";
import { LOGIN, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import google from "../../image/google_logo-google_icongoogle-512.webp";
const Login = () => {
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  // handle form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //loading
  const [loading, setLoading] = useState(false);
  //cookie
  const cookie = Cookie();
  //err
  const [err, setErr] = useState("");
  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      cookie.set("commerce", token);
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("wrong email or password");
      } else {
        setErr("Internal serval Error");
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
              <h1>Login</h1>
              <div className="mb-3 form-control">
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
              <div className="mb-3 form-control">
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password...."
                  required
                  minLength="6"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary">Submit</button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      style={{ width: "50px", height: "50px" }}
                      className="google-icon"
                      src={google}
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>sign in with google</b>
                  </p>
                </a>
              </div>

              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
