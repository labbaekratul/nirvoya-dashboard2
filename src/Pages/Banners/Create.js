import { Card, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { createBanner } from "../../redux/Actions/bannerAction";

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store
  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { success } = bannerCreate;

  // react hook
  const [saveButton, setSaveButton] = useState("Save");
  const [image, setImage] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [category, setCategory] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(
        `https://nirvoya.herokuapp.com/api/category`
      );
      setCategory(data.categoryList);
    };
    getCategory();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
  const onSubmit = (data) => {
    const bannerData = {
      title: data.title,
      url,
      orderby: data.orderby,
      status: data.status,
      image: image,
    };

    if (!image) {
      alert("Image is required!");
    } else {
      dispatch(createBanner(bannerData));
      setSaveButton("Save...");
    }
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/banners");
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
              <Breadcrumb title="Banner Create" url="/banners"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      <div className="row">
                        {/* title */}
                        <div className="col-6">
                          <div className="form-floating mb-3">
                            <input
                              {...register("title", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.title ? "is-invalid" : " "
                              }`}
                              placeholder="Title"
                              name="title"
                              autoFocus
                            />
                            <label>
                              Title <span className="text-danger">*</span>
                            </label>
                            <span className="text-danger">
                              {errors.title && "Title is required"}
                            </span>
                          </div>
                        </div>

                        {/* url */}
                        <div className="col-6">
                          <label>Choose Category</label>
                          <div className="form-floating mb-3">
                            {/* <input
                              {...register("url")}
                              type="text"
                              className="form-control"
                              placeholder="URL"
                              name="url"
                            /> */}

                            <select onChange={(e) => setUrl(e.target.value)}>
                              {category
                                ? category?.map((x) => (
                                    <option value={x._id} key={x._id}>
                                      {x.name}
                                    </option>
                                  ))
                                : "loading"}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* orderby */}
                      <div className="form-floating mb-3">
                        <input
                          {...register("orderby", { required: true })}
                          type="text"
                          className={`form-control ${
                            errors.orderby ? "is-invalid" : " "
                          }`}
                          name="orderby"
                          placeholder="OrderBy"
                        />
                        <label>
                          OrderBy <span className="text-danger">*</span>
                        </label>
                        <span className="text-danger">
                          {errors.orderby && "OrderBy is required"}
                        </span>
                      </div>

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
                              checked
                              defaultValue="Active"
                              {...register("status")}
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
                              {...register("status")}
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
                        <Link className="myButton me-2" to="/banners">
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
