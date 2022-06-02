import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { bannerDetail, updateBanner } from "../../redux/Actions/bannerAction";

const Edit = () => {
  const { bannerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store
  const bannerDetails = useSelector((state) => state.bannerDetails);
  const { banner } = bannerDetails;
  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { success } = bannerUpdate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [orderby, setOrderBy] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    orderby: "",
    image: "",
  });

  // data get
  useEffect(() => {
    if (!banner || banner._id !== bannerId) {
      dispatch(bannerDetail(bannerId));
    } else {
      setTitle(banner.title);
      setUrl(banner.url);
      setImage(banner.image);
      setOrderBy(banner.orderby);
      setStatus(banner.status);
    }
  }, [dispatch, bannerId, banner]);

  // image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      if (image?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: image.data.bucketName,
          Key: image.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads",
          bodyFormData,
          {}
        );
        setLoadingUpload(false);
        setImage(data);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads",
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

  // upload image delete
  const handleImageDelete = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setImage("");
    }
  };

  // form submit
  const onSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      _id: bannerId,
      title: title,
      url: url,
      orderby: orderby,
      image: image,
      status: status,
    };

    if (!title) {
      setErrors({ title: "title is required!" });
    } else if (!image) {
      setErrors({ image: "image is required!" });
    } else if (!orderby) {
      setErrors({ orderby: "orderby is required!" });
    } else {
      dispatch(updateBanner(updateData));
      setSaveButton("Save...");
    }
  };

  // update effect
  useEffect(() => {
    if (success) {
      history.push("/banners");
      setSaveButton("Save");
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
              <Breadcrumb title="Banner Edit" url="/banners"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form onSubmit={onSubmit} className="formStyle">
                      <div className="row">
                        {/* title */}
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              name="name"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              autoFocus
                            />
                            <label>
                              Title <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">{errors.title}</span>
                          </div>
                        </div>

                        {/* url */}
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="URL"
                              name="url"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                            />
                            <label>URL</label>
                          </div>
                        </div>
                      </div>

                      {/* orderby */}
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="orderby"
                          placeholder="OrderBy"
                          value={orderby}
                          onChange={(e) => setOrderBy(e.target.value)}
                        />
                        <label>
                          OrderBy <span className="text-danger">*</span>
                        </label>
                        <span className="text-danger">{errors.orderby}</span>
                      </div>

                      {/* image */}
                      <div className="my-3">
                        <label className="form-label">
                          Image <span className="text-danger">*</span>
                        </label>
                        <div className="imageData d-flex  align-items-center">
                          <div className="imageInput">
                            <input
                              name="image"
                              className="form-control"
                              type="file"
                              onChange={handleImageUpload}
                            />
                            <BsCloudUpload className="imageUploadIcon" />
                          </div>

                          <Card
                            className="imageUpload me-3 p-1"
                            style={{ width: "200px", height: "80px" }}
                          >
                            <img
                              src={
                                image?.data?.url
                                  ? image?.data?.url
                                  : defaultImage
                              }
                              alt=""
                            />

                            {image?.data?.key && (
                              <button
                                onClick={() => handleImageDelete(image.data)}
                                type="button"
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
                        <span className="text-danger">{errors.image}</span>
                      </div>

                      {/* status */}
                      <div className="form-group">
                        <label className="mb-1">
                          Status <span className="text-danger">*</span>
                        </label>
                        <div className="d-flex">
                          <div className="form-check mx-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="status"
                              id="active"
                              defaultValue="Active"
                              checked={status === "Active"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="active"
                            >
                              Active
                            </label>
                          </div>

                          <div className="form-check mx-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="status"
                              id="deactive"
                              defaultValue="Deactive"
                              checked={status === "Deactive"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="deactive"
                            >
                              Deactive
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* save button */}
                      <div className="my-3 text-end">
                        <Link className="myButton  me-2" to="/banners">
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
