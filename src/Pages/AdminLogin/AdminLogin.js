import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { BsEye, BsEyeSlash, BsLock } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import loginImage from "../../Asset/secure-login.gif";
import { adminSignin } from "../../redux/Actions/adminActions";
import style from './styleLogin.module.css';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  // react hook
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // redux store call
  const adminSigninData = useSelector((state) => state.adminSignin);
  const { adminInfo, loading, error } = adminSigninData;

  // onsubmit
  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    dispatch(adminSignin(loginData));
  };

  useEffect(() => {
    if (adminInfo) {
      history.replace(from);
    }
  }, [history, adminInfo, from]);

  return (
    <section id={`${style.adminLogin}`}>
      <div className="container">
        <div
          className="row gx-0 justify-content-center align-items-center"
          style={{ height: "900px" }}
        >
          <div className="col-11">
            <div className="row gx-0">
              <div className="col-6 d-flex justify-content-center align-items-center">
                <div className={`${style.adminLoginImage}`}>
                  <img
                    src={loginImage}
                    alt="admin login page"
                  />
                </div>
              </div>

              <div className={`col-6 p-5 ${style.form}`}>
                <Card className={`p-5 w-100`}>
                  <h4 className="boldh4 mb-4">Admin Login</h4>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      {/* email */}
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <AiOutlineMail />
                          </span>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            name="email"
                            {...register("email", { required: true })}
                          />
                        </div>
                        <span className="text-danger">
                          {errors.email && "Email is required"}
                        </span>
                      </div>
                      
                      {/* password */}
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <BsLock />
                          </span>
                          <input
                            {...register("password", { required: true })}
                            type={!show ? "password" : "text"}
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Password"
                            name="password"
                          />
                          {show ? (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => setShow(!show)}
                              className="input-group-text"
                            >
                              <BsEye />
                            </span>
                          ) : (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => setShow(!show)}
                              className="input-group-text"
                            >
                              <BsEyeSlash />
                            </span>
                          )}
                        </div>
                        <span className="text-danger">
                          {errors.password && "Password is required"}
                        </span>
                      </div>

                      {/* login */}
                      <div className="form-group mt-3">
                        <button className="myButton" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;