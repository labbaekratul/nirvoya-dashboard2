import { Card } from "@material-ui/core";
import Axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { FaSave, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import {
  editEntrepreneurs,
  updateEntrepreneurs,
} from "../../redux/Actions/entrepreneursActions";
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

const EntrepreneurEdit = () => {
  const { entrepreneurId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const editor = useRef(null);

  // redux store
  const entrepreneurUpdate = useSelector((state) => state.entrepreneursUpdate);
  const { success, error } = entrepreneurUpdate;
  const getEntrepreneursEdit = useSelector((state) => state.entrepreneursEdit);
  const { entrepreneurEdit } = getEntrepreneursEdit;

  // all state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState([]);
  const [password, setPassword] = useState("");
  const [idtype, setIdtype] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState([]);
  const [code, setCode] = useState([]);
  const [status, setStatus] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [legalForm, setLegalForm] = useState("");
  const [address, setAddress] = useState("");
  const [division, setDivision] = useState("");
  const [postCode, setPostCode] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [focusKeyword, setFocusKeyword] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
  const [sellPercentage, setSellPercentage] = useState("");
  const [merchantType, setMerchantType] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [nidImgFrontPart, setNidImgFrontPart] = useState({});
  const [nidImgBackPart, setNidImgBackPart] = useState({});
  const [district, setDistrict] = useState("");
  const [bankAccInfo, setBankAccInfo] = useState({});
  const [slug, setSlug] = useState("");
  const [saveButton, setSaveButton] = useState("Save");

  // use effect edit data
  useEffect(() => {
    if (!entrepreneurEdit || entrepreneurEdit._id !== entrepreneurId) {
      dispatch(editEntrepreneurs(entrepreneurId));
    } else {
      setName(entrepreneurEdit.name);
      setEmail(entrepreneurEdit.email);
      setPhone(entrepreneurEdit.phone);
      setPassword(entrepreneurEdit.password);
      setIdtype(entrepreneurEdit.idtype);
      setIdNumber(entrepreneurEdit.idNumber);
      setImage(entrepreneurEdit.image);
      setDescription(entrepreneurEdit.description);
      setProduct(entrepreneurEdit.product);
      setCode(entrepreneurEdit.code);
      setSellPercentage(entrepreneurEdit.sellPercentage);
      setMerchantType(entrepreneurEdit.merchantType);
      setNidImgFrontPart(entrepreneurEdit.nidImgFrontPart);
      setNidImgBackPart(entrepreneurEdit.nidImgBackPart);
      setStatus(entrepreneurEdit.status);
      setBusinessName(entrepreneurEdit.businessName);
      setBusinessRegistrationNumber(
        entrepreneurEdit.businessRegistrationNumber
      );
      setLegalForm(entrepreneurEdit.legalForm);
      setAddress(entrepreneurEdit.address);
      setDivision(entrepreneurEdit.division);
      setPostCode(entrepreneurEdit.postCode);
      setBankAccInfo(entrepreneurEdit.bankAccInfo);
      setMetaTitle(entrepreneurEdit.metaTitle);
      setFocusKeyword(entrepreneurEdit.focusKeyword);
      setMetaDescription(entrepreneurEdit.metaDescription);
      setDistrict(entrepreneurEdit.district);
      setSlug(entrepreneurEdit.slug);
    }
  }, [dispatch, entrepreneurId, entrepreneurEdit]);

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

  // onsubmit
  const handleSubmit = (e) => {
    setSaveButton("Save...");
    e.preventDefault();
    const entrepreneurformData = {
      _id: entrepreneurEdit._id,
      name,
      slug,
      email,
      phone,
      password,
      idtype,
      idNumber,
      image,
      description,
      product,
      sellPercentage,
      merchantType,
      nidImgFrontPart,
      nidImgBackPart,
      code,
      status,
      businessName,
      businessRegistrationNumber,
      legalForm,
      address,
      division,
      district,
      postCode,
      bankAccInfo,
      metaTitle,
      focusKeyword,
      metaDescription,
    };

    dispatch(updateEntrepreneurs(entrepreneurformData));
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      history.push("/entrepreneurs");
    } else if (error) {
      setSaveButton("Save");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [success, history, error]);

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
                title="Entrepreneur Edit"
                url="/entrepreneurs"
              ></Breadcrumb>

              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <form onSubmit={handleSubmit} className="my-4">
                    {/* Basic Information */}
                    <Card className="py-4 px-5 mb-4">
                      <div className="my-4 pb-3 border-bottom">
                        {error && (
                          <div class="alert alert-danger" role="alert">
                            {error}
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
                                type="text"
                                className="form-control"
                                placeholder="Entrepreneurs Name"
                                name="name"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                              />
                              <label>
                                Seller Name
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>

                          {/* Entrepreneurs Mail */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Entrepreneurs Email"
                                name="email"
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <label>Entrepreneurs Email</label>
                            </div>
                          </div>
                          {/* Entrepreneurs phone */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="Phone"
                                className="form-control"
                                placeholder="Entrepreneurs Phone"
                                name="Phone"
                                defaultValue={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              <label>
                                Entrepreneurs Phone
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Entrepreneurs password */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="password"
                                defaultValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label>
                                Password <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                          {/* NID type */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                name="idtype"
                                onChange={(e) => setIdtype(e.target.value)}
                                className="form-select"
                              >
                                <option aria-selected>select</option>
                                <option
                                  selected={idtype === "NID Number"}
                                  value="NID Number"
                                >
                                  NID Number
                                </option>
                                <option
                                  selected={idtype === "LIC Number"}
                                  value="LIC Number"
                                >
                                  LIC Number
                                </option>
                              </select>
                              <label>NIT Type</label>
                            </div>
                          </div>

                          {/* NID number */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="NID Number"
                                name="idNumber"
                                defaultValue={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                              />
                              <label>NID Number</label>
                            </div>
                          </div>
                        </div>
                        {/*entrepreneur image*/}
                        <Card className="mb-3 p-3">
                          <ImgUplHandler
                            loadingUpload={loadingUpload}
                            image={image}
                            progress={progress}
                            uploadFileHandler={uploadFileHandler}
                            setImage={setImage}
                            fileName="image"
                          />
                        </Card>

                        {/* Your Info */}
                        <div className="form-group mb-3">
                          <label className="mb-1">Your Info</label>
                          <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={(e) => setDescription(e)}
                            onChange={(newContent) => {}}
                          />
                        </div>

                        {/*Sell Percentage*/}
                        <div className="row">
                          <div className="col">
                            <div className="form-floating ">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Sell Percentage"
                                value={sellPercentage}
                                onChange={(e) =>
                                  setSellPercentage(e.target.value)
                                }
                                onWheel={(e) => e.target.blur()}
                              />
                              <label>
                                Sell Percentage
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                          {/*Merchant Type*/}
                          <div className="col">
                            <div className="form-floating ">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Merchant Type"
                                value={merchantType}
                                onChange={(e) =>
                                  setMerchantType(e.target.value)
                                }
                              />
                              <label>Merchant Type</label>
                            </div>
                          </div>
                        </div>

                        {/* NID image */}
                        <Card className="d-flex p-3 my-4">
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
                            className="form-check-input"
                            type="checkbox"
                            checked={status ? "checked" : ""}
                            id="status"
                            defaultValue={status}
                            onChange={() => setStatus(!status)}
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
                                type="text"
                                className="form-control"
                                placeholder="Business Name"
                                name="businessName"
                                defaultValue={businessName}
                                onChange={(e) =>
                                  setBusinessName(e.target.value)
                                }
                              />
                              <label>Business Name</label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Business Registration Number"
                                name="businessRegistrationNumber"
                                defaultValue={businessRegistrationNumber}
                                onChange={(e) =>
                                  setBusinessRegistrationNumber(e.target.value)
                                }
                              />
                              <label>Business Registration Number</label>
                            </div>
                          </div>
                        </div>

                        {/* legal Form*/}
                        <div className="form-floating mb-3">
                          <select
                            name="legalForm"
                            onChange={(e) => setLegalForm(e.target.value)}
                            className="form-select"
                          >
                            <option aria-selected>
                              -- select Legal Form --
                            </option>
                            <option
                              selected={legalForm === "Proprietorship"}
                              value="Proprietorship"
                            >
                              Proprietorship
                            </option>
                            <option
                              selected={legalForm === "Partnership company"}
                              value="Partnership company"
                            >
                              Partnership company
                            </option>
                            <option
                              selected={legalForm === "Limited company"}
                              value="Limited company"
                            >
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
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                defaultValue={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                              <label>Address</label>
                            </div>
                          </div>

                          {/* Post Code */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Post Code"
                                name="postCode"
                                defaultValue={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                              />
                              <label>Post Code</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* division */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                onChange={(e) => setDivision(e.target.value)}
                                className="form-select"
                                value={division}
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

                          <div className="col">
                            <div className="form-floating mb-3">
                              <select
                                onChange={(e) => setDistrict(e.target.value)}
                                className="form-select"
                                value={district}
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
                                type="text"
                                className="form-control"
                                placeholder="Bank Account Name"
                                name="bankAccountName"
                                value={bankAccInfo.bankAccountName}
                                onChange={(e) =>
                                  setBankAccInfo({
                                    bankAccountName: e.target.value,
                                  })
                                }
                              />
                              <label>Bank Account Name</label>
                            </div>
                          </div>
                          {/* Account Number */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Account Number"
                                name="accountNumber"
                                value={bankAccInfo.accountNumber}
                                onChange={(e) =>
                                  setBankAccInfo({
                                    accountNumber: e.target.value,
                                  })
                                }
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
                                type="text"
                                className="form-control"
                                placeholder="Bank Name"
                                name="bankName"
                                value={bankAccInfo.bankName}
                                onChange={(e) =>
                                  setBankAccInfo({
                                    bankName: e.target.value,
                                  })
                                }
                              />
                              <label>Bank Name</label>
                            </div>
                          </div>

                          {/* Branch Name */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Branch Name"
                                name="branchName"
                                value={bankAccInfo.branchName}
                                onChange={(e) =>
                                  setBankAccInfo({
                                    branchName: e.target.value,
                                  })
                                }
                              />
                              <label>Branch Name</label>
                            </div>
                          </div>
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
                              <label className="mb-1">Meta Title</label>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Meta Title"
                                  name="metaTitle"
                                  defaultValue={metaTitle}
                                  onChange={(e) => setMetaTitle(e.target.value)}
                                />
                                <label>Meta Title</label>
                              </div>
                            </div>
                          </div>

                          {/* Meta Keyword */}
                          <div className="col">
                            <div className="form-group">
                              <label className="mb-1">Focus Keyword</label>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Focus Keyword"
                                  name="Focus Keyword"
                                  defaultValue={focusKeyword}
                                  onChange={(e) =>
                                    setFocusKeyword(e.target.value)
                                  }
                                />
                                <label>Focus Keyword</label>
                              </div>
                            </div>
                          </div>

                          {/*Slug*/}
                          <div className="col">
                            <div className="form-group">
                              <label className="mb-1">Slug</label>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Slug"
                                  name="Slug"
                                  defaultValue={slug}
                                  onChange={(e) => setSlug(e.target.value)}
                                />
                                <label>Slug</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Meta Description */}
                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control"
                            placeholder="Meta Description"
                            name="metaDescription"
                            defaultValue={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                          ></textarea>
                          <label>Meta Description</label>
                        </div>

                        {/* save button */}

                        <div className="card shadow-sm my-3 p-3">
                          <div className="d-flex justify-content-end align-items-center">
                            <div className="me-3">
                              <Link
                                className="myButton"
                                to="/admin/entrepreneurs"
                              >
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

export default EntrepreneurEdit;
