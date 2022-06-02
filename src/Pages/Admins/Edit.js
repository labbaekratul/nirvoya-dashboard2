import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { detailsAdmin, updateAdmin } from '../../redux/Actions/adminActions';

const Edit = () => {
  const { adminId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store call
  const adminDetailsData = useSelector((state) => state.adminDetails);
  const { adminDetails } = adminDetailsData;
  const adminUpdateData = useSelector((state) => state.adminUpdate);
  const { success } = adminUpdateData;

  // rest hook
  const [saveButton, setSaveButton] = useState("Save");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");

  // data get
  useEffect(() => {
    if (!adminDetails || adminDetails._id !== adminId) {
      dispatch(detailsAdmin(adminId));
    } else {
      setFirstName(adminDetails.firstName);
      setLastName(adminDetails.lastName);
      setEmail(adminDetails.email);
      setPassword(adminDetails.password);
      setPhone(adminDetails.phone);
      setPosition(adminDetails.position);
      setRole(adminDetails.role);
    }
  }, [dispatch, adminId, adminDetails]);

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      _id: adminDetails._id,
      firstName,
      lastName,
      email,
      password,
      phone,
      position,
      role,
    };
    dispatch(updateAdmin(formData));
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
              <Breadcrumb title="Admin Edit" url="/admins"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form onSubmit={handleSubmit} className="formStyle">
                      <div className="row">
                        {/* firstName */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              autoFocus
                            />
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                        {/* lastName */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* email */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>

                        {/* phone */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone"
                              name="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <label>
                              Phone <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* position */}
                        <div className="col">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Position"
                              name="position"
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                            />
                            <label>
                              Position <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>

                        {/* role */}
                        <div className="col">
                          <div className="form-floating">
                            <select
                              name="role"
                              onChange={(e) => setRole(e.target.value)}
                              className="form-select"
                            >
                              <option value="">--Select Role--</option>
                              <option
                                selected={role === "EC Members"}
                                value="EC Members"
                              >
                                EC Members
                              </option>
                              <option
                                selected={role === "Super Admin"}
                                value="Super Admin"
                              >
                                Super Admin
                              </option>
                              <option selected={role === "Admin"} value="Admin">
                                Admin
                              </option>
                              <option
                                selected={role === "Sales Staff"}
                                value="Sales Staff"
                              >
                                Sales Staff
                              </option>
                              <option
                                selected={role === "Inventory Manager"}
                                value="Inventory Manager"
                              >
                                Inventory Manager
                              </option>
                              <option
                                selected={role === "POS Manager"}
                                value="POS Manager"
                              >
                                POS Manager
                              </option>
                              <option
                                selected={role === "Editor"}
                                value="Editor"
                              >
                                Editor
                              </option>
                              <option
                                selected={role === "Author"}
                                value="Author"
                              >
                                Author
                              </option>
                              <option
                                selected={role === "Contributor"}
                                value="Contributor"
                              >
                                Contributor
                              </option>
                              <option
                                selected={role === "Subcriber"}
                                value="Subcriber"
                              >
                                Subcriber
                              </option>
                            </select>
                            <label>
                              Role <span className="text-danger"> *</span>
                            </label>
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

export default Edit;