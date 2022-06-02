import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { updateUser, userDetails } from '../../redux/Actions/userAuthAction';

const Edit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();

  // redux
  const userEdit = useSelector((state) => state.userDetails);
  const { user } = userEdit;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, error } = userUpdate;

  const [alertMessage, setAlertMessage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saveButton, setSaveButton] = useState("Save");

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(userDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAlertMessage(true);
    }
  }, [dispatch, user, userId]);

  // submit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name: name,
        email: email,
        phone: phone,
        password: user?.password,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push("/admin/users");
      setAlertMessage(false);
      setSaveButton("Save...");
    }
  }, [success, history]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col__10" id="dashboard_body">
            <TopBar />
            <HeaderPart />
            <div className="ds_body w-100">
              <Breadcrumb title="User Edit" url="/admin/users"></Breadcrumb>

              <div className="row justify-content-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form onSubmit={onSubmit} className="formStyle">
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
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              autoFocus
                            />
                            <label>Name *</label>
                          </div>
                        </div>
                        <div className="col">
                          {/* user email */}
                          <div className="form-floating mb-3">
                            <input
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              type="email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <label>Email *</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          {/* user phone */}
                          <div className="form-floating mb-3">
                            <input
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              type="tel"
                              className="form-control"
                              placeholder="Phone"
                            />
                            <label>Phone *</label>
                          </div>
                        </div>
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

export default Edit;