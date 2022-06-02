import { Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from '../../Component/Loading/Loading';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { colorDetail, updateColor } from '../../redux/Actions/colorActions';
import { COLOR_UPDATE_RESET } from '../../redux/Constants/colorConstants';

const Edit = () => {
  const { colorId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store
  const colorDetails = useSelector((state) => state.colorDetails);
  const { color, loading } = colorDetails;
  const colorUpdate = useSelector((state) => state.colorUpdate);
  const { success: successUpdate } = colorUpdate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");
  const [name, setName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    if (!color || color._id !== colorId || successUpdate) {
      dispatch({ type: COLOR_UPDATE_RESET });
      dispatch(colorDetail(colorId));
    } else {
      setName(color.name);
      setColorCode(color.colorCode);
      setDescription(color.description);
      setStatus(color.status);
      setOrderBy(color.orderBy);
    }
  }, [colorId, dispatch, history, successUpdate, color]);

  // onsubmit
  const onSubmit = (data) => {
    data.preventDefault();
    setSaveButton("Save...");
    dispatch(
      updateColor({
        _id: colorId,
        name,
        colorCode,
        description,
        status,
        orderBy,
        slug: name,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      setSaveButton("Save");
      history.push("/colors");
    }
  }, [successUpdate, history]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <Breadcrumb title="Color Edit" url="/colors"></Breadcrumb>

              {loading ? (
                <Loading />
              ) : (
                <div className="row justify-content-md-center">
                  <div className="col-md-8">
                    <Card className="p-5">
                      <form onSubmit={onSubmit} className="formStyle">
                        <div className="row">
                          {/* color name */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Color Name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <label>Color Name *</label>
                            </div>
                          </div>
                          {/* color code */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Color Code"
                                value={colorCode}
                                onChange={(e) => setColorCode(e.target.value)}
                              />
                              <label>Color Code</label>
                            </div>
                          </div>
                        </div>

                        {/* textarea */}
                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                          <label>Description *</label>
                        </div>

                        {/* orderby */}
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="OrderBy"
                            value={orderBy}
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
                            value={status}
                            onChange={() => setStatus(!status)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkbox"
                          >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;