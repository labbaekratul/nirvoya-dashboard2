import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from "yup";
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { registers } from '../../redux/Actions/userAuthAction';

const Create = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  // redux store
  const userRegister = useSelector((state) => state.userRegister);
  const { success, error } = userRegister;

  // react hook
  const [alertMessage, setAlertMessage] = useState(false);
  const [saveButton, setSaveButton] = useState("Save");

  // form validation
  const validationSchema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    phone: yup
      .string()
      .min(11, "phone must be at least 11 characters")
      .required("Phone is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  // submit
  const onSubmit = (data) => {
    dispatch(registers(data));
    localStorage.removeItem("userInfo");
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push("/users"), 1000);
      setAlertMessage(false);
      setSaveButton("Save...");
      localStorage.removeItem("userInfo");
    } else {
      setAlertMessage(true);
    }
  }, [success, history]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>
            <div className="ds_body w-100">
              <Breadcrumb title="User Create" url="/users"></Breadcrumb>

              <div className="row justify-content-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      {alertMessage && error ? (
                        <div className="row">
                          <div className="col">
                            <div
                              class="alert alert-warning alert-dismissible fade show"
                              role="alert"
                            >
                              <strong>{error}</strong>
                              <button
                                onClick={() => setAlertMessage(false)}
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                              ></button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        " "
                      )}

                      <div className="row">
                        <div className="col">
                          {/* user name */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("name", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.name ? "is-invalid" : " "
                              }`}
                              placeholder="Name"
                              name="name"
                              autoFocus
                            />
                            <label>Name *</label>
                            <span className="text-danger">
                              {errors.name?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col">
                          {/* user email */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("email")}
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                            />
                            <label>Email *</label>
                            <span className="text-danger">
                              {errors.email?.type === "required" &&
                                "Email is required"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          {/* user phone */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("phone")}
                              type="tel"
                              className={`form-control ${
                                errors.phone ? "is-invalid" : " "
                              }`}
                              placeholder="Phone"
                              name="phone"
                            />
                            <label>Phone *</label>
                            <span className="text-danger">
                              {errors.phone?.message}
                            </span>
                          </div>
                        </div>

                        <div className="col">
                          {/* user password */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("password")}
                              type="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : " "
                              }`}
                              placeholder="Password"
                              name="password"
                            />
                            <label>Password *</label>
                            <span className="text-danger">
                              {errors.password?.message}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-check mx-2 mt-2">
                        <input
                          {...register("isAdmin")}
                          className="form-check-input"
                          type="checkbox"
                          value={true}
                          id="isAdmin"
                        />
                        <label className="form-check-label" htmlFor="isAdmin">
                          isAdmin
                        </label>
                      </div>

                      {/* save button */}
                      <div className="my-3 text-end">
                        <button type="submit" className="myButton">
                          <FaSave /> {`${saveButton}`}
                        </button>
                      </div>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;