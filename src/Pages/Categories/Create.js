import { Card } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { TreeSelect } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import Loading from "../../Component/Loading/Loading";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import {
  addCategory,
  createCategories,
} from "../../redux/Actions/categoryAction";

const CategoryCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (parentId) => {
    setParentId(parentId);
  };

  // redux store
  const allCategory = useSelector((state) => state.category);
  const { categories } = allCategory;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success } = categoryCreate;

  // react hook
  const [parentId, setParentId] = useState(undefined);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [progress, setProgress] = useState(0);

  const renderCategories = (categoriess) => {
    let myCategoriess = [];
    categoriess?.forEach((category) =>
      myCategoriess.push({
        title: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      })
    );
    return myCategoriess;
  };

  useEffect(() => {
    if (success) {
      history.push("/categories");
      dispatch(addCategory());
    }

    dispatch(addCategory());
  }, [dispatch, history, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCategories({
        name,
        parentId,
        image,
        feature,
        status,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("category", file);
    setLoadingUpload(true);

    try {
      if (image.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: image.data.bucketName,
          Key: image.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/categoryImg",
          bodyFormData,

          {
            onUploadProgress: (progressEvent) => {
              setProgress(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setLoadingUpload(false);
        setImage(data);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/categoryImg",
          bodyFormData,

          {
            onUploadProgress: (progressEvent) => {
              setProgress(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setLoadingUpload(false);
        setImage(data);
      }
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const deleteIconHandler = async (data) => {
    if (window.confirm("Are you sure to delete?")) {
      await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setImage("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar></SideBar>
        <div className="col__10" id="dashboard_body">
          <TopBar></TopBar>
          <HeaderPart></HeaderPart>

          <div className="ds_body w-100">
            <Breadcrumb title="Category Create" url="/categories"></Breadcrumb>
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-md-8 formStyle bg-white rounded-3 shadow-lg p-5">
                  {/* Category Name */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                    <label>Category Name *</label>
                  </div>

                  {/* image upload */}
                  <div className="mb-1 w-50">
                    {loadingUpload ? (
                      <Loading />
                    ) : (
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <input
                            id="image"
                            type="text"
                            placeholder="Enter image"
                            value={image?.data?.url || ""}
                            onChange={(e) => setImage(e.target.value)}
                            className="mb-3 p-2 d-none"
                          />
                          {image?.data?.url ? (
                            <Alert severity="success">
                              Image uploaded successfully
                            </Alert>
                          ) : (
                            <Alert severity="warning">
                              No Image Uploaded Yet
                            </Alert>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="my-3 p-2">
                        <label className="form-label">Featured Image</label>
                        <div className="imageData d-flex justify-content-center flex-column align-items-center">
                          <div
                            className="imageInput"
                            style={{ marginRight: "0" }}
                          >
                            <input
                              name="displayImage"
                              className="form-control"
                              type="file"
                              onChange={uploadFileHandler}
                            />
                            <IoIosCloudUpload className="imageUploadIcon" />
                          </div>

                          <div
                            className="progress mt-3"
                            style={{ width: "80px" }}
                          >
                            <div
                              className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              style={{ width: `${progress}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {progress}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Card className="imageUpload">
                          <img
                            src={
                              image?.data?.url ? image?.data?.url : defaultImage
                            }
                            className="h-100 w-100 p-1"
                            alt={name}
                          />
                          <button
                            type="button"
                            onClick={() => deleteIconHandler(image.data)}
                            className="imageDelete"
                          >
                            <BsFillTrashFill />
                          </button>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Parent Category */}
                  <div>
                    <label>Parent Category</label>
                    <TreeSelect
                      showSearch
                      style={{ width: "100%", borderRadius: 10 }}
                      value={parentId}
                      dropdownStyle={{ overflow: "auto" }}
                      placeholder="Please select"
                      allowClear
                      onSelect={name}
                      size="large"
                      onChange={onChange}
                      treeLine={true}
                      bordered={true}
                      treeData={renderCategories(categories?.categoryList)}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-floating my-3">
                    <textarea
                      className="form-control"
                      placeholder="Category Description"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description || ""}
                    ></textarea>
                    <label>Category Description</label>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      {/* Meta Title */}
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Meta Title"
                          value={metaTitle}
                          onChange={(e) => setMetaTitle(e.target.value)}
                        />
                        <label>Meta Title</label>
                      </div>
                    </div>

                    <div className="col-6">
                      {/* Meta Keywords */}
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Meta Keywords"
                          value={metaKeywords}
                          onChange={(e) => setMetaKeywords(e.target.value)}
                        />
                        <label>Meta Keywords</label>
                      </div>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div className="form-floating my-3">
                    <textarea
                      className="form-control"
                      placeholder="Meta Description"
                      name="description"
                      onChange={(e) => setMetaDescription(e.target.value)}
                      value={metaDescription || ""}
                    ></textarea>
                    <label>Meta Description</label>
                  </div>

                  <div className="form-check mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked
                      id="checkbox"
                      value={status || ""}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="checkbox">
                      Status
                    </label>
                  </div>

                  <div className="my-3 text-end">
                    <button type="submit" className="myButton">
                      <FaSave /> Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
