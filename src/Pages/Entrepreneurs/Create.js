import { Card } from "@material-ui/core";
import Axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSave, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { createEntrepreneurs } from "../../redux/Actions/entrepreneursActions";
import disNdivision from "./component/district";
import ImgUplHandler from "./component/ImgUplHandler";
import NidBackImg from "./component/NidBackImg";
import NidFrontImg from "./component/NidFrontImg";

// Jodit Editor
export const config = {
  readonly: false,
  toolbar: true,
  height: 400,
  uploader: {
    insertImageAsBase64URI: true,
  },
};

export const config1 = {
  readonly: false,
  toolbar: true,
  height: 250,
  uploader: {
    insertImageAsBase64URI: true,
  },
};

// warranty list
export const warrantyOptions = [
  "15 days",
  "1 Month",
  "2 Months",
  "3 Months",
  "4 Months",
  "5 Months",
  "6 Months",
  "7 Months",
  "8 Months",
  "9 Months",
  "10 Months",
  "11 Months",
  "1 Year",
  "2 Years",
];

const EntrepreneurCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const editor = useRef(null);

  // redux store
  const entrepreneurCreate = useSelector((state) => state.entrepreneursCreate);
  const { success, error } = entrepreneurCreate;

  const [phone, setPhone] = useState([]);
  const [image, setImage] = useState({});
  const [nidImgFrontPart, setNidImgFrontPart] = useState({});
  const [nidImgBackPart, setNidImgBackPart] = useState({});
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorList, setErrorList] = useState({});
  const [description, setDescription] = useState("");
  const [saveButton, setSaveButton] = useState("Save");

  // phone
  const handleChangePhone = (newValue) => {
    const phoneNumber = [];
    newValue.map((x) => phoneNumber.push(x.value));
    setPhone(phoneNumber);
  };

  // use form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // onSubmit
  const onSubmit = (data) => {
    setSaveButton("Save...");
    const entrepreneurformData = {
      name: data.name,
      email: data.email,
      phone: phone, // array
      password: data.password,
      idtype: data.idtype,
      idNumber: data.idNumber,
      description: description,
      image: image,
      nidImgFrontPart: nidImgFrontPart,
      nidImgBackPart: nidImgBackPart,
      sellPercentage: data.sellPercentage,
      merchantType: data.merchantType,
      status: data.status,
      businessName: data.businessName,
      businessRegistrationNumber: data.businessRegistrationNumber,
      legalForm: data.legalForm,
      address: data.address,
      division: division,
      district: district,
      postCode: data.postCode,
      bankAccInfo: {
        bankAccountName: data.bankAccountName,
        accountNumber: data.AccountNumber,
        bankName: data.bankname,
        branchName: data.branchName,
      },
      uploadBankDocuments: data.uploadBankDocuments,
      metaTitle: data.metaTitle,
      focusKeyword: data.focusKeyword,
      metaDescription: data.metaDescription,
    };

    if (!phone.length) {
      setErrorList({ phone: "Phone is required!" });
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    } else if (!image) {
      setErrorList({ image: "Image is required!" });
    } else {
      dispatch(createEntrepreneurs(entrepreneurformData));
    }
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/entrepreneurs");
      setErrorMessage("");
    } else if (error) {
      setSaveButton("Save");
      setErrorMessage(error);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [success, history, error]);

  // entrepreneurs image uploading
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData?.append("entrepreneur", file);
    setLoadingUpload(true);
    try {
      if (image?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: image.data.bucketName,
          Key: image.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneurImg",
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
        setImage(data);
        setLoadingUpload(false);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneurImg",
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
        setImage(data);
        setLoadingUpload(false);
      }
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  // entrepreneurs NID front-part image uploading
  const uploadNidFrontHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData?.append("entrepreneurNidFrontImg", file);
    setLoadingUpload(true);
    try {
      if (nidImgFrontPart?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: nidImgFrontPart.data.bucketName,
          Key: nidImgFrontPart.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneur-Nid-Front-Img",
          bodyFormData,
          {
            onUploadProgress: (progressEvent) => {
              setProgress2(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setNidImgFrontPart(data);
        setLoadingUpload(false);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneur-Nid-Front-Img",
          bodyFormData,
          {
            onUploadProgress: (progressEvent) => {
              setProgress2(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setNidImgFrontPart(data);
        setLoadingUpload(false);
      }
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  // entrepreneurs NID back-part image uploading
  const uploadNidBackHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("entrepreneurNidBackImg", file);
    setLoadingUpload(true);
    try {
      if (nidImgBackPart?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: nidImgBackPart.data.bucketName,
          Key: nidImgBackPart.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneur-Nid-Back-Img",
          bodyFormData,
          {
            onUploadProgress: (progressEvent) => {
              setProgress3(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setNidImgBackPart(data);
        setLoadingUpload(false);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads/entrepreneur-Nid-Back-Img",
          bodyFormData,
          {
            onUploadProgress: (progressEvent) => {
              setProgress3(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        setNidImgBackPart(data);
        setLoadingUpload(false);
      }
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const test = (t) => {
    if (t === "Dhaka") {
      return disNdivision.Dhaka.map((x) => <option>{x}</option>);
    } else if (t === "Chittagong") {
      return disNdivision.Chittagong.map((x) => <option>{x}</option>);
    } else if (t === "Barisal") {
      return disNdivision.Barisal.map((x) => <option>{x}</option>);
    } else if (t === "Khulna") {
      return disNdivision.Khulna.map((x) => <option>{x}</option>);
    } else if (t === "Mymensingh") {
      return disNdivision.Mymensingh.map((x) => <option>{x}</option>);
    } else if (t === "Rajshahi") {
      return disNdivision.Rajshahi.map((x) => <option>{x}</option>);
    } else if (t === "Rangpur") {
      return disNdivision.Rangpur.map((x) => <option>{x}</option>);
    } else if (t === "Sylhet") {
      return disNdivision.Sylhet.map((x) => <option>{x}</option>);
    }
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>
            <div className="ds_body w-100">
              <Breadcrumb
                title="Entrepreneur Create"
                url="/entrepreneurs"
              ></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="my-4">
                    {/* Basic Information */}
                    <Card className="py-4 px-5 mb-4">
                      <div className="my-4 pb-3 border-bottom">
                        {errorMessage && (
                          <div class="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        )}
                        <h5 className="boldh5">Basic Information</h5>
                      </div>
                      <div className="formStyle">
                        <div className="row">
                          {/* Entrepreneurs Name */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("name", { required: true })}
                                type="text"
                                className={`form-control ${
                                  errors.name ? "is-invalid" : ""
                                }`}
                                placeholder="Entrepreneurs Name"
                                autoFocus
                              />
                              <label>
                                Seller Name
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.name && "product name is required!"}
                              </span>
                            </div>
                          </div>

                          {/* Entrepreneurs Mail */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("email", { required: true })}
                                type="email"
                                className={`form-control ${
                                  errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Entrepreneurs Email"
                                name="email"
                              />
                              <label>
                                Entrepreneurs Email{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.email &&
                                  "Entrepreneurs Email is required!"}
                              </span>
                            </div>
                          </div>
                          {/* Entrepreneurs phone */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("password", { required: true })}
                                type="password"
                                className={`form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="password"
                              />
                              <label>
                                Password <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.password && "Password is required!"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* Entrepreneurs phone */}
                          <div className="col">
                            <div className="form-group">
                              <label className="mb-1">
                                Entrepreneurs Phone
                                <span className="text-danger fs-6"> *</span>
                              </label>
                              <div className="form-floating mb-3">
                                <CreatableSelect
                                  isMulti
                                  onChange={handleChangePhone}
                                  placeholder="Write Phone Numbers..."
                                />
                                <span className="text-danger">
                                  {errorList?.phone}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* NID type */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                {...register("idtype", { required: true })}
                                className={`form-control ${
                                  errors.idtype ? "is-invalid" : ""
                                }`}
                              >
                                <option value="">--Select--</option>
                                <option value="NID Number">NID Number</option>
                                <option value="LIC Number">LIC Number</option>
                              </select>
                              <label>ID Type</label>
                              <span className="text-danger">
                                {errors.idtype && "ID Type is required!"}
                              </span>
                            </div>
                          </div>

                          {/* NID number */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("idNumber", { required: true })}
                                type="text"
                                className={`form-control ${
                                  errors.idNumber ? "is-invalid" : ""
                                }`}
                                placeholder="NID Number"
                                name="idNumber"
                              />
                              <label>ID Number</label>
                              <span className="text-danger">
                                {errors.idNumber && "ID Number is required!"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/*Image Uploading for entrepreneur*/}
                        <ImgUplHandler
                          image={image}
                          progress={progress}
                          uploadFileHandler={uploadFileHandler}
                          setImage={setImage}
                          fileName="image"
                        />
                        {/* Your Info */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Your Info
                            <span className="text-danger fs-5"> *</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={(data) => setDescription(data)}
                            onChange={(newContent) => {}}
                          />
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-floating ">
                              <input
                                {...register("sellPercentage", {
                                  required: true,
                                })}
                                type="number"
                                className={`form-control ${
                                  errors.sellPercentage ? "is-invalid" : ""
                                }`}
                                placeholder="Sell Percentage"
                                onWheel={(e) => e.target.blur()}
                              />
                              <label>
                                Sell Percentage
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.sellPercentage &&
                                  "Sell Percentage is required!"}
                              </span>
                            </div>
                          </div>

                          <div className="col">
                            <div className="form-floating ">
                              <input
                                {...register("merchantType")}
                                type="text"
                                className="form-control"
                                placeholder="Merchant Type"
                              />
                              <label>Merchant Type</label>
                            </div>
                          </div>
                        </div>

                        {/* NID image */}
                        <Card className="row d-flex mt-4 my-3 pt-3">
                          {/* front side NID image */}
                          <NidFrontImg
                            loadingUpload={loadingUpload}
                            nidImgFrontPart={nidImgFrontPart}
                            progress={progress2}
                            uploadFileHandler={uploadNidFrontHandler}
                            setNidImgFrontPart={setNidImgFrontPart}
                            fileName="nidFrontPart"
                          />
                          {/* back side NID image */}
                          <NidBackImg
                            loadingUpload={loadingUpload}
                            nidImgBackPart={nidImgBackPart}
                            progress={progress3}
                            uploadFileHandler={uploadNidBackHandler}
                            setNidImgBackPart={setNidImgBackPart}
                            fileName="nidBackPart"
                          />
                        </Card>

                        {/* Status */}
                        <div className="form-check mx-2">
                          <input
                            {...register("status")}
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            id="status"
                          />
                          <label className="form-check-label" htmlFor="status">
                            Status
                          </label>
                        </div>
                      </div>
                    </Card>

                    {/* Business Information */}
                    <Card className="py-4 px-5 mb-4">
                      <div className="formStyle">
                        <div className="my-4 pb-3 border-bottom">
                          <h5 className="boldh5">Business Information</h5>
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("businessName")}
                                type="text"
                                className="form-control"
                                placeholder="Business Name"
                              />
                              <label>Business Name</label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("businessRegistrationNumber")}
                                type="text"
                                className="form-control"
                                placeholder="Business Registration Number"
                              />
                              <label>Business Registration Number</label>
                            </div>
                          </div>
                        </div>

                        {/* legal Form*/}
                        <div className="form-floating mb-3">
                          <select
                            {...register("legalForm")}
                            className="form-select"
                          >
                            <option aria-selected>
                              -- select Legal Form --
                            </option>
                            <option value="Proprietorship">
                              Proprietorship
                            </option>
                            <option value="Partnership company">
                              Partnership company
                            </option>
                            <option value="Limited company">
                              Limited company
                            </option>
                          </select>
                          <label>Legal Form</label>
                        </div>

                        <div className="row">
                          {/* address */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("address")}
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                              />
                              <label>Address</label>
                            </div>
                          </div>

                          {/* post code */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("postCode")}
                                type="text"
                                className="form-control"
                                placeholder="Post Code"
                                name="postCode"
                              />
                              <label>Post Code</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/*Division*/}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                onChange={(e) => setDivision(e.target.value)}
                                className="form-select"
                              >
                                <option aria-selected>
                                  -- Select Division --
                                </option>
                                <option value="Barisal">Barisal</option>
                                <option value="Chittagong">Chittagong</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Sylhet">Sylhet</option>
                              </select>
                              <label>Division</label>
                            </div>
                          </div>
                          {/*District*/}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                onChange={(e) => setDistrict(e.target.value)}
                                className="form-select"
                              >
                                <option aria-selected>
                                  -- Select District --
                                </option>
                                {test(division)}
                              </select>
                              <label>District</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Bank Account Information */}
                    <Card className="py-4 px-5 mb-4">
                      <div className="formStyle">
                        <div className="my-4 pb-3 border-bottom">
                          <h5 className="boldh5">Bank Account Information</h5>
                        </div>
                        <div className="row">
                          {/* Bank Account Name */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("bankAccountName")}
                                type="text"
                                className="form-control"
                                placeholder="Bank Account Name"
                              />
                              <label>Bank Account Name</label>
                            </div>
                          </div>
                          {/* Account Number */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("AccountNumber")}
                                type="text"
                                className="form-control"
                                placeholder="Account Number"
                              />
                              <label>Account Number</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Bank Name */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("bankname")}
                                type="text"
                                className="form-control"
                                placeholder="Bank Name"
                                name="bankname"
                              />
                              <label>Bank Name</label>
                            </div>
                          </div>

                          {/* Branch Name */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("branchName")}
                                type="text"
                                className="form-control"
                                placeholder="Branch Name"
                              />
                              <label>Branch Name </label>
                            </div>
                          </div>
                          {/* <div className="custom-file my-2">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              multiple
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                          </div> */}
                        </div>
                      </div>
                    </Card>

                    {/* optional data */}
                    <Card className="py-4 px-5 mb-4">
                      <div className="formStyle">
                        <div className="my-4 pb-3 border-bottom">
                          <h5 className="boldh5">Optional Data</h5>
                        </div>
                        <div className="row">
                          {/* meta Title */}
                          <div className="col">
                            <div className="form-group">
                              <div className="form-floating mb-3">
                                <input
                                  {...register("metaTitle")}
                                  type="text"
                                  className="form-control"
                                  placeholder="Meta Title"
                                />
                                <label>Meta Title</label>
                              </div>
                            </div>
                          </div>

                          {/* Meta Keyword */}
                          <div className="col">
                            <div className="form-group">
                              <div className="form-floating mb-3">
                                <input
                                  {...register("focusKeyword")}
                                  type="text"
                                  className="form-control"
                                  placeholder="Focus Keyword"
                                />
                                <label>Focus Keyword</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Meta Description */}
                        <div className="form-floating mb-3">
                          <textarea
                            {...register("metaDescription")}
                            className="form-control"
                            placeholder="Meta Description"
                            name="metaDescription"
                          ></textarea>
                          <label>Meta Description</label>
                        </div>

                        {/* save button */}
                        <div className="card shadow-sm my-3 p-3">
                          <div className="d-flex justify-content-end align-items-center">
                            <div className="me-3">
                              <Link className="myButton" to="/entrepreneurs">
                                <FaUndo /> Back
                              </Link>
                            </div>
                            <div className="my-3 text-end">
                              <button type="submit" className="myButton">
                                <FaSave /> {saveButton}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurCreate;
