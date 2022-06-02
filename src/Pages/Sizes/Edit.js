import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { editSize, updateSize } from '../../redux/Actions/sizeActions';

const Edit = () => {
  const { sizeId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store
  const sizeEditData = useSelector((state) => state.sizeEdit);
  const { sizeEdit } = sizeEditData;
  const sizeUpdate = useSelector((state) => state.sizeUpdate);
  const { success } = sizeUpdate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [status, setStatus] = useState(false);

  // useEffect
  useEffect(() => {
    if (!sizeEdit || sizeEdit._id !== sizeId) {
      dispatch(editSize(sizeId));
    } else {
      setName(sizeEdit.name);
      setDescription(sizeEdit.description);
      setOrderBy(sizeEdit.orderBy);
      setStatus(sizeEdit.status);
    }
  }, [dispatch, sizeId, sizeEdit]);

  // form submit
  const handleSubmitSize = (e) => {
    e.preventDefault();
    const data = {
      _id: sizeEdit?._id,
      name: name,
      description: description,
      orderBy: orderBy,
      status: status,
      slug: name,
    };
    dispatch(updateSize(data));
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
              <Breadcrumb title="Size Edit" url="/sizes"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form onSubmit={handleSubmitSize} className="formStyle">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Size Name"
                          name="name"
                          defaultValue={name}
                          onChange={(e) => setName(e.target.value)}
                          autoFocus
                        />
                        <label>Size Name *</label>
                      </div>

                      {/* textarea */}
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          name="description"
                          defaultValue={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label>Description *</label>
                      </div>

                      {/* orderby */}
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="orderBy"
                          placeholder="OrderBy"
                          defaultValue={orderBy}
                          onChange={(e) => setOrderBy(e.target.value)}
                        />
                        <label>OrderBy</label>
                      </div>

                      {/* checkbox */}
                      <div className="form-check mx-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={status ? "checked" : ""}
                          id="checkbox"
                          defaultValue={status}
                          onChange={() => setStatus(!status)}
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

export default Edit;