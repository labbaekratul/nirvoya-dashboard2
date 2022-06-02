import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { createAdmin } from '../../redux/Actions/adminActions';

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  // redux store
  const adminCreate = useSelector((state) => state.adminCreate);
  const { success } = adminCreate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");

  // react hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // submit
  const onSubmit = (data) => {
    const adminData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phone,
      position: data.position,
      role: data.role,
    };

    dispatch(createAdmin(adminData));
    setSaveButton("Save...");
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/admins");
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
              <Breadcrumb title="Admin Create" url="/admins"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      <div className="row">
                        {/* firstName */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              {...register("firstName", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.firstName ? "is-invalid" : ""
                              }`}
                              placeholder="First Name"
                              name="firstName"
                              autoFocus
                            />
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.firstName && "First Name is required!"}
                            </span>
                          </div>
                        </div>
                        {/* lastName */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              {...register("lastName", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.firstName ? "is-invalid" : ""
                              }`}
                              placeholder="Last Name"
                              name="lastName"
                            />
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.lastName && "Last Name is required!"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* email */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              {...register("email", { required: true })}
                              type="email"
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              placeholder="Email"
                              name="email"
                            />
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.email && "Email is required!"}
                            </span>
                          </div>
                        </div>

                        {/* phone */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              {...register("phone", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.phone ? "is-invalid" : ""
                              }`}
                              placeholder="Phone"
                              name="phone"
                            />
                            <label>
                              Phone <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.phone && "Phone is required!"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* password */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              {...register("password", { required: true })}
                              type="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Password"
                              name="password"
                            />
                            <label>
                              Password <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.password && "Password is required!"}
                            </span>
                          </div>
                        </div>

                        {/* position */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.position ? "is-invalid" : ""
                              }`}
                              placeholder="Position"
                              name="position"
                              {...register("position", { required: true })}
                            />
                            <label>
                              Position <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.position && "Position is required!"}
                            </span>
                          </div>
                        </div>

                        {/* role */}
                        <div className="col">
                          <div className="form-floating">
                            <select
                              {...register("role", { required: true })}
                              name="role"
                              className={`form-select ${
                                errors.role ? "is-invalid" : ""
                              }`}
                            >
                              <option value="">--Select Role--</option>
                              <option value="EC Members">EC Members</option>
                              <option value="Super Admin">Super Admin</option>
                              <option value="Admin">Admin</option>
                              <option value="Sales Staff">Sales Staff</option>
                              <option value="Inventory Manager">
                                Inventory Manager
                              </option>
                              <option value="POS Manager">POS Manager</option>
                              <option value="Editor">Editor</option>
                              <option value="Author">Author</option>
                              <option value="Contributor">Contributor</option>
                              <option value="Subcriber">Subcriber</option>
                            </select>
                            <label>
                              Role <span className="text-danger"> *</span>
                            </label>
                            <span className="text-danger">
                              {errors.role && "Role is required!"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* save button */}
                      <div className="my-3 text-end">
                        <Link className="myButton me-2" to="/admins">
                          Back
                        </Link>
                        <button type="submit" className="myButton">
                          <FaSave /> {saveButton}
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