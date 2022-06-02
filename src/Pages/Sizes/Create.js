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
import { createSizes } from '../../redux/Actions/sizeActions';

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sizeCreate = useSelector((state) => state.sizeCreate);
  const { success } = sizeCreate;

  const [saveButton, setSaveButton] = useState("Save");

  // react form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // onsubmit
  const onSubmit = (data) => {
    dispatch(createSizes(data));
    setSaveButton("Save...");
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/sizes");
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
              <Breadcrumb title="Size Create" url="/sizes"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      <div className="form-floating mb-3">
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : " "
                          }`}
                          placeholder="Size Name"
                          name="name"
                          autoFocus
                        />
                        <label>Size Name *</label>
                        <span className="text-danger">
                          {errors.name?.type === "required" &&
                            "Size name is required"}
                        </span>
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
                            "Size name is required"}
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