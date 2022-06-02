import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { detailsAdmin, updateAdmin } from "../../redux/Actions/adminActions";

const Edit = () => {
  const { adminId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store call
  const adminDetailsData = useSelector((state) => state.adminDetails);
  const { adminDetails } = adminDetailsData;
  const adminUpdateData = useSelector((state) => state.adminUpdate);
  const { success } = adminUpdateData;

  // react hook
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  // react action
  useEffect(() => {
    if (!adminDetails || adminDetails._id !== adminId) {
      dispatch(detailsAdmin(adminId));
    } else {
      setFirstName(adminDetails.firstName);
      setLastName(adminDetails.lastName);
      setEmail(adminDetails.email);
      setPhone(adminDetails.phone);
      setImage(adminDetails.image);
      setPosition(adminDetails.position);
      setRole(adminDetails.role);
      setAddress(adminDetails.address);
    }
  }, [dispatch, adminDetails, adminId]);

  // image upload
  const displayImageHandle = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("admin", file);
    setLoadingUpload(true);

    try {
      if (image?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: image.data.bucketName,
          Key: image.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/adminImg",
          bodyFormData,
          {}
        );
        setLoadingUpload(false);
        setImage(data);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/adminImg",
          bodyFormData,
          {}
        );
        setLoadingUpload(false);
        setImage(data);
      }
    } catch (error) {
      console.log(error.message);
      setLoadingUpload(false);
    }
  };

  // image delete
  const handleImageDelete = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setImage("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      _id: adminDetails._id,
      firstName,
      lastName,
      email,
      role,
      password: adminDetails.password,
      phone,
      position,
      address,
      image,
    };

    dispatch(updateAdmin(formData));
  };

  useEffect(() => {
    if (success) {
      history.push("/profile");
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
              <div className="row">
                <Breadcrumb title="Profile Edit" url="/profile"></Breadcrumb>

                {/* admin profile udpate */}
                <div className="col-md-12">
                  <div className="row justify-content-center mt-4">
                    <div className="col-8 bg-white rounded-3 shadow-lg p-4">
                      <form onSubmit={handleFormSubmit} className="formStyle">
                        <div className="row">
                          {/* first name */}
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
                                First Name
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                          {/* last name */}
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
                                Last Name
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* user email */}
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
                                Email <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>

                          {/* user phone */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              <label>
                                Phone <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Position */}
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
                                Position
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                          {/* address */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                              <label>
                                Address
                                <span className="text-danger"> *</span>
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
                                <option
                                  selected={role === "Admin"}
                                  value="Admin"
                                >
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

                        <div className="my-3">
                          <label className="form-label">
                            Image
                            <span className="text-danger"> *</span>
                          </label>

                          <div className="imageData d-flex align-items-center">
                            <div className="imageInput">
                              <input
                                name="displayImage"
                                className="form-control"
                                type="file"
                                onChange={displayImageHandle}
                              />
                              <BsCloudUpload className="imageUploadIcon" />
                            </div>

                            <Card className="imageUpload me-3 p-1">
                              <img
                                src={!image ? defaultImage : image?.data?.url}
                                alt=""
                              />

                              {image !== "" && (
                                <button
                                  type="button"
                                  onClick={() => handleImageDelete(image.data)}
                                  className="imageDelete"
                                >
                                  <BsTrash />
                                </button>
                              )}
                            </Card>
                            {loadingUpload && (
                              <div>
                                <CircularProgress color="inherit" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* save button */}
                        <div className="my-3 text-end">
                          <button type="submit" className="myButton">
                            <FaSave /> Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
