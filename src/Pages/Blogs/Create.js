import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { createBlog } from "../../redux/Actions/blogActions";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const editor = useRef(null);

  // redux store
  const blogCreate = useSelector((state) => state.blogCreate);
  const { success } = blogCreate;

  // react hook
  const [textedit, setTextedit] = useState("");
  const [saveButton, setSaveButton] = useState("Save");
  const [image, setImage] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);

  // image upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("blog", files);

    for (let i = 0; i < files.length; i++) {
      formData.append("blog", files[i]);
    }
    setLoadingUpload(true);
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/uploads/multiple-blog",
      formData,
      {}
    );

    // console.log(data);
    const totalImage = [...image, ...data];
    setLoadingUpload(false);
    setImage(totalImage);
  };

  // upload image delete
  const handleImageDelete = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      const newData = image?.filter((x) => x.url !== data.url);
      setImage(newData);
    }
  };

  // Jodit Editor
  const config = {
    readonly: false,
    toolbar: true,
    height: 400,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };
  const onEditorChange = (data) => {
    setTextedit(data);
  };

  // react form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // onsubmit
  const onSubmit = (data) => {
    setSaveButton("Save...");
    const blogCreate = {
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      description: textedit,
      image: image,
      status: data.status,
      featured: data.featured,
      blogWritter: {
        name: "nure alam",
      },
    };
    // blog create action
    dispatch(createBlog(blogCreate));
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/blogs");
    }
  }, [history, success]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <Breadcrumb title="Blog Create" url="/blogs"></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <Card className="p-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="formStyle"
                    >
                      <div className="row">
                        <div className="col">
                          {/* title */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("title", { required: true })}
                              type="text"
                              className={`form-control ${
                                errors.title ? "is-invalid" : " "
                              }`}
                              placeholder="Blog Title"
                              name="title"
                              autoFocus
                            />
                            <label>Blog Title *</label>
                            <span className="text-danger">
                              {errors.title?.type === "required" &&
                                "Blog title is required"}
                            </span>
                          </div>
                        </div>

                        <div className="col">
                          {/* subtitle */}
                          <div className="form-floating mb-3">
                            <input
                              {...register("subtitle")}
                              type="text"
                              className="form-control"
                              placeholder="Blog Subtitle"
                              name="subtitle"
                            />
                            <label>Blog Subtitle *</label>
                          </div>
                        </div>
                      </div>

                      {/* category */}
                      <div className="form-floating mb-3">
                        <input
                          {...register("category", { required: true })}
                          type="text"
                          className={`form-control ${
                            errors.category ? "is-invalid" : " "
                          }`}
                          placeholder="Blog Category"
                          name="category"
                        />
                        <label>Blog Category *</label>
                        <span className="text-danger">
                          {errors.category?.type === "required" &&
                            "Blog Category is required"}
                        </span>
                      </div>

                      {/* textarea */}
                      <div className="form-group">
                        <label className="mb-2" htmlFor="description">
                          Blog Description
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={textedit}
                          config={config}
                          onBlur={onEditorChange}
                          onChange={(newContent) => {}}
                        />
                      </div>
                      {/* image */}
                      <div className="my-3">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <div className="imageData d-flex  align-items-center">
                          <div className="imageInput">
                            <input
                              name="image"
                              className="form-control"
                              type="file"
                              onChange={handleImageUpload}
                              multiple
                            />
                            <BsCloudUpload className="imageUploadIcon" />
                          </div>

                          {image.length !== 0 ? (
                            image?.map((img, index) => (
                              <div
                                className="imageUpload text-center"
                                key={index}
                              >
                                <Card
                                  className="p-1"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  <img src={img.url} alt="" />
                                  <button
                                    type="button"
                                    onClick={() => handleImageDelete(img)}
                                    className="imageDelete"
                                  >
                                    <BsTrash />
                                  </button>
                                </Card>
                              </div>
                            ))
                          ) : (
                            <div className="imageUpload">
                              <Card
                                className="p-1"
                                style={{ width: "100%", height: "100%" }}
                              >
                                <img src={defaultImage} alt="" />
                              </Card>
                            </div>
                          )}

                          {loadingUpload && (
                            <div className="ms-2">
                              <CircularProgress color="inherit" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* podcast */}
                      {/* <div className="my-3">
                        <label htmlFor="podcast" className="form-label">
                          Podcast
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="podcast"
                          name="podcast"
                        />
                      </div> */}

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

                      {/* featured */}
                      <div className="form-check mx-2">
                        <input
                          {...register("featured")}
                          className="form-check-input"
                          type="checkbox"
                          name="featured"
                          id="featured"
                        />
                        <label className="form-check-label" htmlFor="featured">
                          Featured
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
