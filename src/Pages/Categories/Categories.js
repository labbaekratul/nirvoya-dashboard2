/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { TreeSelect } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import Tree from "rc-tree";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { IoIosCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import Loading from "../../Component/Loading/Loading";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import {
  addCategory,
  categoryDetail,
  deleteCategories,
  updateCategory,
} from "../../redux/Actions/categoryAction";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
  CATEGORY_UPDATE_RESET,
} from "../../redux/Constants/categoryConstants";
import "./Categories.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
}));

const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onAppearStart: (node) => {
    console.log("Start Motion:", node);
    return { height: 0 };
  },
  onAppearActive: (node) => ({ height: node.scrollHeight }),
  onLeaveStart: (node) => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};

const Categories = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  // toastify message show
  const notify = (data) => toast.success(data);

  const Category = useSelector((state) => state.category);
  const { loading, categories } = Category;

  const createdCategory = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = createdCategory;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category: CategoryDetail } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: successUpdate } = categoryUpdate;

  // react hook
  const [checked, setChecked] = useState("");
  const [parentId, setParentId] = useState(undefined);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [feature, setFeature] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [progress, setProgress] = useState(0);

  const onChange = (parentId) => {
    setParentId(parentId);
  };

  useEffect(() => {
    if (checked.checked) {
      dispatch(categoryDetail(checked.checked));
    }
  }, [checked, dispatch]);

  useEffect(() => {
    dispatch(addCategory());

    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      notify("Category Created successfully");
    }

    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      notify("Category updated");
    }

    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
  }, [dispatch, successCreate, successDelete, successUpdate]);

  const renderCategories = (categoriess) => {
    let myCategoriess = [];
    for (let category of categoriess) {
      myCategoriess.push({
        title: category.name,
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategoriess;
  };

  const selectCategories = (categoriess) => {
    let myCategoriess = [];
    for (let category of categoriess) {
      myCategoriess.push({
        title: category.name,
        value: category._id,
        children:
          category.children.length > 0 && selectCategories(category.children),
      });
    }
    return myCategoriess;
  };

  const handleSubmit = (data) => {
    data.preventDefault();
    dispatch(
      updateCategory({
        _id: checked?.checked,
        name,
        slug,
        parentId,
        image,
        status,
        feature,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
      })
    );
    history.push("/categories");
  };

  const editHandler = () => {
    setShowHide(true);
    dispatch(categoryDetail(checked?.checked));
    if (CategoryDetail) {
      setName(CategoryDetail.name);
      setSlug(CategoryDetail.slug);
      setParentId(CategoryDetail.parentId);
      setImage(CategoryDetail.image);
      setStatus(CategoryDetail.status);
      setFeature(CategoryDetail.feature);
      setDescription(CategoryDetail.description);
      setMetaTitle(CategoryDetail.metaTitle);
      setMetaDescription(CategoryDetail.metaDescription);
      setMetaKeywords(CategoryDetail.metaKeywords);
    }
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCategories(checked.checked));
      notify("Category Deleted");
    }
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
      console.log(error.message);
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

    dispatch(
      updateCategory({
        _id: checked?.checked,
        name,
        slug,
        parentId,
        image: "",
        status,
        feature,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
      })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar></SideBar>
        <div className="col__10" id="dashboard_body">
          <TopBar></TopBar>
          <HeaderPart></HeaderPart>

          <div className="ds_body w-100">
            <div className="row">
              <Breadcrumb
                title="Category Create"
                url="/category/create/"
              ></Breadcrumb>
              <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                <div className="row">
                  <div className="col-3">
                    {loading ? (
                      <Loading />
                    ) : (
                      <Card className="p-2">
                        <div className="draggable-demo">
                          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                          <Tree
                            treeData={renderCategories(
                              categories?.categoryList
                            )}
                            onSelect={(checked) => setChecked({ checked })}
                            draggable
                            motion={motion}
                          />
                        </div>
                      </Card>
                    )}
                  </div>

                  <div className="col-1">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="mx-2 adminBtnButton"
                        onClick={editHandler}
                      >
                        <BsPencil className="pencilButton" />
                      </button>

                      <button
                        type="button"
                        className="adminBtnButton"
                        onClick={deleteHandler}
                      >
                        <BsTrash className="trashButton" />
                      </button>
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="ml-5 d-flex justify-content-between">
                      <div>
                        <FcSurvey
                          style={{ fontSize: "40px", cursor: "pointer" }}
                          onClick={() => setShowHide(!showHide)}
                        />
                        <small>{!showHide ? "Hide" : "Show"}</small>
                      </div>
                      <div className="d-flex">
                        <div className="text-end">
                          <Link to="/category/create" className="myButton">
                            <BsPlus /> Create
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 formStyle">
                      {showHide && (
                        <form onSubmit={handleSubmit} className={classes.root}>
                          <div className="py-5 px-3">
                            <div className="row">
                              <div className="col-6">
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
                              </div>

                              <div className="col-6">
                                {/* Slug */}
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Slug"
                                    name="name"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                  />
                                  <label>Slug</label>
                                </div>
                              </div>
                            </div>

                            {/* Parent Category */}
                            <div className="my-3">
                              {loading ? (
                                <Loading />
                              ) : (
                                <>
                                  <label>Parent Category</label>
                                  <TreeSelect
                                    showSearch
                                    style={{ width: "100%", borderRadius: 10 }}
                                    value={parentId}
                                    dropdownStyle={{
                                      maxHeight: 400,
                                      overflow: "auto",
                                    }}
                                    placeholder="Please select"
                                    allowClear
                                    onSelect={name}
                                    size="large"
                                    onChange={onChange}
                                    treeLine={true}
                                    treeData={renderCategories(
                                      categories?.categoryList
                                    )}
                                  />
                                </>
                              )}
                            </div>

                            {/* Image uploaded */}
                            <div className="mb-3 w-50">
                              {loadingUpload ? (
                                <Loading />
                              ) : (
                                <div className="d-flex justify-content-between mb-3 align-items-center">
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
                                        Image Not Uploaded Yet
                                      </Alert>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="formStyle d-flex justify-content-between align-items-center">
                                <div className="my-3 p-2 d-flex flex-column align-items-center justify-content-center">
                                  <div>
                                    <label className="form-label">
                                      Featured Image
                                    </label>
                                  </div>
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
                                      style={{ width: "100%" }}
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
                                      className="p-1 w-100 h-100"
                                      src={
                                        image?.data?.url
                                          ? image?.data?.url
                                          : defaultImage
                                      }
                                      alt={name}
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteIconHandler(image?.data)
                                      }
                                      className="imageDelete"
                                    >
                                      <BsFillTrashFill />
                                    </button>
                                  </Card>
                                </div>
                              </div>
                            </div>

                            {/* Category Description */}
                            <div className="form-floating my-3">
                              <textarea
                                className="form-control"
                                placeholder="Description"
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
                                    onChange={(e) =>
                                      setMetaTitle(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setMetaKeywords(e.target.value)
                                    }
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
                                onChange={(e) =>
                                  setMetaDescription(e.target.value)
                                }
                                value={metaDescription || ""}
                              ></textarea>
                              <label>Meta Description</label>
                            </div>

                            {/* Status */}
                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked
                                id="checkbox"
                                value={status || ""}
                                onChange={(e) => setStatus(e.target.value)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkbox"
                              >
                                Status
                              </label>
                            </div>

                            <div className="my-3 text-end">
                              <button type="submit" className="myButton">
                                <FaSave /> Save
                              </button>
                              <ToastContainer
                                autoClose={2000}
                                theme="colored"
                                position="top-right"
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
