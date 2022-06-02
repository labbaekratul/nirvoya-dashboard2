import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { createColor } from '../../redux/Actions/colorActions';

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store
  const colorCreate = useSelector((state) => state.colorCreate);
  const { success } = colorCreate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");

  // react form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // onsubmit
  const onSubmit = (data) => {
    setSaveButton("Save...");
    dispatch(createColor(data));
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/colors");
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
              <Breadcrumb title="Color Create" url="/colors"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      <div className="row">
                        {/* color name */}
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input
                              {...register("name", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.name ? "is-invalid" : " "
                              }`}
                              placeholder="Color Name"
                              name="name"
                              autoFocus
                            />
                            <label>Color Name *</label>
                            <span className="text-danger">
                              {errors.name?.type === "required" &&
                                "Color name is required"}
                            </span>
                          </div>
                        </div>
                        {/* color code */}
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input
                              {...register("colorCode")}
                              type="text"
                              className="form-control"
                              placeholder="Color Code"
                              name="colorCode"
                            />
                            <label>Color Code</label>
                          </div>
                        </div>
                      </div>

                      {/* textarea */}
                      <div className="form-floating mb-3">
                        <textarea
                          {...register("description", { required: true })}
                          className={`form-control ${
                            errors.description ? "is-invalid" : " "
                          }`}
                          placeholder="Description"
                          name="description"
                        ></textarea>
                        <label>Description *</label>
                        <span className="text-danger">
                          {errors.description?.type === "required" &&
                            "Color name is required"}
                        </span>
                      </div>

                      {/* orderby */}
                      <div className="form-floating mb-3">
                        <input
                          {...register("orderBy")}
                          type="text"
                          className="form-control"
                          name="orderBy"
                          placeholder="OrderBy"
                        />
                        <label>OrderBy</label>
                      </div>

                      {/* checkbox */}
                      <div className="form-check mx-2">
                        <input
                          {...register("status")}
                          className="form-check-input"
                          type="checkbox"
                          name="status"
                          defaultChecked
                          id="checkbox"
                        />
                        <label className="form-check-label" htmlFor="checkbox">
                          Status
                        </label>
                      </div>

                      {/* save button */}
                      <div className="my-3 text-end">
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