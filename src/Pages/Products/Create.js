import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import {
  childCategoryList,
  subChildCategoryList,
} from "../../redux/Actions/categoryAction";
import { createProduct } from "../../redux/Actions/productActions";
import Util, { config, config1, warrantyOptions } from "./Util";

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const editor = useRef(null);
  // localstorage getitem
  const imageDisplay = JSON.parse(localStorage.getItem("image"));
  const multipleImage = JSON.parse(localStorage.getItem("multipleImage"));
  const { mainCategory, category, subCategory, entrepreneurList } = Util();

  // react hook
  const [errorList, setErrorList] = useState({});

  const [saveButton, setSaveButton] = useState("Save");
  const [warranty, setWarranty] = useState(false);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [shippingReturnPolicy, setShippingReturnPolicy] = useState("");
  const [displayImage, setDisplayImage] = useState(imageDisplay || "");
  const [productDetailsImgs, setProductDetailsImgs] = useState(
    multipleImage || []
  );
  const [loadingUpload, setLoadingUpload] = useState(undefined);
  const [mainCategore, setMainCategore] = useState([]);
  const [categore, setCategore] = useState([]);
  const [subCategore, setSubCategore] = useState([]);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellPercentage, setSellPercentage] = useState(0);
  const [sendValue, setSendValue] = useState(null);
  const [discount, setDiscount] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  // localstorage setitem
  localStorage.setItem("image", JSON.stringify(displayImage));
  localStorage.setItem("multipleImage", JSON.stringify(productDetailsImgs));

  // ------- redux store get data -------------
  // product create success
  const productCreate = useSelector((state) => state.productCreate);
  const { success } = productCreate;

  // category and subcategory call data
  useEffect(() => {
    if (mainCategore) {
      dispatch(
        childCategoryList({
          id: mainCategore.mainCategoryId,
          parentName: mainCategore.mainCategoryName,
        })
      );
    }
  }, [dispatch, mainCategore]);

  useEffect(() => {
    if (categore) {
      dispatch(
        subChildCategoryList({
          id: categore.categoryId,
          parentName: categore.categoryName,
        })
      );
    }
  }, [dispatch, categore]);

  // -------------------  product description -------------------------------
  // Description
  const onDescriptiChange = (data) => {
    setDescription(data);
  };
  // short Description
  const shortDescriptionOnChange = (data) => {
    setShortDescription(data);
  };
  // shipping return policy
  const ShippingReturnPolicyOnChange = (data) => {
    setShippingReturnPolicy(data);
  };
  // main category
  const onChange = (data) => {
    setMainCategore({
      mainCategoryId: data?.value,
      mainCategoryName: data?.label,
    });
  };
  // category
  const onChangeCategory = (data) => {
    setCategore({ categoryId: data?.value, categoryName: data?.label });
  };
  // subcategory
  const onChangeSubCategory = (data) => {
    setSubCategore({
      subCategoryId: data?.value,
      subCategoryName: data?.label,
    });
  };

  // -------------------------  image upload --------------------------
  // single image upload
  const displayImageHandle = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload("single");

    try {
      if (displayImage?.data?.key) {
        await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: displayImage.data.bucketName,
          Key: displayImage.data.key,
        });

        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads",
          bodyFormData,
          {}
        );
        setLoadingUpload("");
        setDisplayImage(data);
      } else {
        const { data } = await Axios.post(
          "https://nirvoya.herokuapp.com/api/uploads",
          bodyFormData,
          {}
        );
        setLoadingUpload("");
        setDisplayImage(data);
      }
    } catch (error) {
      console.log(error.message);
      setLoadingUpload("");
    }
  };

  // multiple upload
  const productDetailsImgsHandle = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("images", files);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    setLoadingUpload("multiple");
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/uploads/multiple",
      formData,
      {}
    );

    const totalImage = [...productDetailsImgs, ...data];

    setLoadingUpload("");
    setProductDetailsImgs(totalImage);
  };

  // single image upload delete
  const handleImageDelete = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setDisplayImage("");
      localStorage.removeItem("image");
    }
  };

  // multiple image update delete
  const MultiImageDeletehandler = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      const newData = productDetailsImgs?.filter((x) => x.url !== data.url);
      setProductDetailsImgs(newData);
    }
  };

  // --------------------- form submit ----------------------
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // profitmargin calculation
  const marginProfit = (sell__Price, sell__Percentage) => {
    const total =
      (parseFloat(sell__Price) * parseFloat(sell__Percentage)) / 100;
    return parseFloat(total).toFixed(2);
  };

  useEffect(() => {
    setSendValue(marginProfit(sellPrice, sellPercentage));
  }, [sellPrice, sellPercentage]);

  // discount price
  const discount_Price = (sell__Price, sell__Percentage) => {
    const total =
      (parseFloat(sell__Price) * parseFloat(sell__Percentage)) / 100;
    return parseFloat(total).toFixed(2);
  };

  useEffect(() => {
    setDiscountPrice(discount_Price(sellPrice, discount));
  }, [sellPrice, discount]);

  // form submit
  const onSubmit = (data) => {
    const productData = {
      name: data.productName,
      productCode: data.productCode,
      mainCategory: mainCategore,
      category: categore,
      subCategory: subCategore,
      entrepreneur: data.entrepreneurs.value,
      model: data.model,
      displayImage: displayImage,
      productDetailsImgs: productDetailsImgs,
      tag: data.productTag,
      shortDescription: shortDescription,
      description: description,
      warrantyType: data.warrantyType,
      warrantyPeriod:
        data.warrantyType === "no-warranty" ? " " : data.warrantyPeriod,
      warrantyPolicy: data.warrantyPolicy,
      videoUrl: data.videoURL,
      status: data.status,
      isActive: data.isActive,
      storeOnly: data.onSale,
      productDisplay: data.productDisplay,
      isTranding: data.isTranding,
      feature: data.feature,
      requireDocuments: data.requireDocuments,
      costPrice: data.costPrice,
      sellPrice: sellPrice,
      discount: discount,
      discountPrice: discountPrice,
      discountPeriod: data.discountPeriod,
      taxPrice: data.taxPrice,
      weight: data.weight,
      unit: data.unit,
      material: data.material,
      sellPercentage: sellPercentage,
      profitMargin: sendValue,
      countInStock: data.countInStock,
      color: data.color,
      size: data.size,
      callForPrice: data.callForPrice,
      onSale: data.onSale,
      shippingAndReturnPolicy: shippingReturnPolicy,
      metaTag: data.metaTag,
      focusKeyword: data.focusKeyword,
      metaDescription: data.metaDescription,
    };

    // form validation
    if (!mainCategore) {
      setErrorList({ mainCategore: "Main Category is required!" });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (!categore) {
      setErrorList({ categore: "Category is required!" });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (!displayImage) {
      setErrorList({ displayImage: "Display Image is required!" });
      window.scrollTo({
        top: 100,
        behavior: "smooth",
      });
    } else if (!productDetailsImgs.length) {
      setErrorList({
        productDetailsImgs: "Product Details Image is required!",
      });
      window.scrollTo({
        top: 100,
        behavior: "smooth",
      });
    } else if (!shortDescription) {
      setErrorList({ shortDescription: "Short Description is required!" });
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    } else if (!description) {
      setErrorList({ description: "Description is required!" });
      window.scrollTo({
        top: 900,
        behavior: "smooth",
      });
    } else if (!shippingReturnPolicy) {
      setErrorList({
        shippingReturnPolicy: "Shipping Return Policy is required!",
      });
      window.scrollTo({
        bottom: 300,
        behavior: "smooth",
      });
    } else {
      setErrorList({});
      dispatch(createProduct(productData));
      setSaveButton("Save...");
    }
  };

  useEffect(() => {
    if (success) {
      setSaveButton("Save");
      localStorage.removeItem("image");
      localStorage.removeItem("multipleImage");
      history.push("/products");
    }
  }, [success, history]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar />
            <HeaderPart />
            <div className="ds_body h-100 w-100">
              <Breadcrumb title="Product Create" url="/products"></Breadcrumb>

              {/* product upload form */}
              <div className="row justify-content-center">
                <div className="col-8">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* product information */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Product Information</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          <div className="col-8">
                            {/* product name */}
                            <div className="form-floating mb-3">
                              <input
                                {...register("productName", { required: true })}
                                type="text"
                                className={`form-control ${
                                  errors.productName ? "is-invalid" : " "
                                }`}
                                placeholder="Product Name"
                                autoFocus
                              />
                              <label>
                                Product Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.productName &&
                                  "Product name is required!"}
                              </span>
                            </div>
                          </div>

                          <div className="col-4">
                            {/* product code */}
                            <div className="form-floating mb-3">
                              <input
                                {...register("productCode", { required: true })}
                                type="text"
                                className={`form-control ${
                                  errors.productCode ? "is-invalid" : " "
                                }`}
                                placeholder="Product Code"
                              />
                              <label>
                                Product Code{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.productCode &&
                                  "Product code is required!"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* product category */}
                          <div className="col">
                            <div className="form-group mb-3">
                              <label
                                className="mb-1"
                                style={{ color: "#e74c3c" }}
                              >
                                Main Category : *
                              </label>
                              <Select
                                name="mainCategory"
                                options={mainCategory}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onChange}
                                isClearable
                              />
                              <span className="text-danger">
                                {errorList.mainCategore}
                              </span>
                            </div>
                          </div>
                          {/* Category */}
                          <div className="col">
                            <div className="form-group mb-3">
                              <label
                                className="mb-1"
                                style={{ color: "#f1c40f" }}
                              >
                                Category :{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                name="category"
                                options={category}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onChangeCategory}
                                isDisabled={!category ? true : false}
                                isClearable
                              />
                              <span className="text-danger">
                                {errorList.categore}
                              </span>
                            </div>
                          </div>
                          {/* Sub Category */}
                          <div className="col">
                            <div className="form-group mb-3">
                              <label
                                className="mb-1"
                                style={{ color: "#16a085" }}
                              >
                                Sub Category :
                              </label>
                              <Select
                                name="category"
                                options={subCategory}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onChangeSubCategory}
                                isDisabled={categore ? false : true}
                                isClearable
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            {/* Entrepreneurs */}
                            <div className="form-group">
                              <label className="mb-1">
                                Seller <span className="text-danger">*</span>
                              </label>
                              <Controller
                                name="entrepreneurs"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isClearable
                                    closeMenuOnSelect={true}
                                    options={entrepreneurList}
                                  />
                                )}
                              />
                              <span className="text-danger">
                                {errors.entrepreneurs &&
                                  "Entrepreneur is required"}
                              </span>
                            </div>
                          </div>

                          <div className="col">
                            {/* Model */}
                            <div className="form-floating mt-4">
                              <input
                                {...register("model")}
                                type="text"
                                className="form-control"
                                placeholder="Product Model"
                              />
                              <label>Product Model</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Images */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Product Images</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        {/* Featured Image */}
                        <div className="my-3">
                          <label className="form-label">
                            Featured Image{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="imageData d-flex align-items-center">
                            <div className="imageInput">
                              <input
                                name="displayImage"
                                className="form-control"
                                type="file"
                                onChange={displayImageHandle}
                              />
                              <BsCloudUpload className="imageUploadIcon" />
                            </div>

                            <Card className="imageUpload me-3 p-1">
                              <img
                                src={
                                  displayImage === ""
                                    ? defaultImage
                                    : displayImage?.data?.url
                                }
                                alt=""
                              />

                              {displayImage !== "" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleImageDelete(displayImage.data)
                                  }
                                  className="imageDelete"
                                >
                                  <BsTrash />
                                </button>
                              )}
                            </Card>
                            {loadingUpload === "single" && (
                              <div>
                                <CircularProgress color="inherit" />
                              </div>
                            )}
                          </div>
                          <span className="text-danger">
                            {errorList.displayImage}
                          </span>
                        </div>
                        {/* More Product Image */}
                        <div className="my-3">
                          <label className="form-label">
                            Product Details Image
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="imageData d-flex align-items-center flex-wrap">
                            <div className="imageInput">
                              <input
                                name="productDetailsImgs"
                                className="form-control"
                                type="file"
                                onChange={productDetailsImgsHandle}
                                multiple
                              />
                              <BsCloudUpload className="imageUploadIcon" />
                            </div>

                            {productDetailsImgs?.length !== 0 ? (
                              productDetailsImgs?.map((img, index) => (
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
                                      onClick={() =>
                                        MultiImageDeletehandler(img)
                                      }
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

                            {loadingUpload === "multiple" && (
                              <div className="ms-2">
                                <CircularProgress color="inherit" />
                              </div>
                            )}
                          </div>
                          <span className="text-danger">
                            {errorList.productDetailsImgs}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* product description */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Product Description</h5>
                      </div>
                      <div className="formStyle px-5 py-3">
                        {/* product Tag */}
                        <div className="form-floating mb-3">
                          <input
                            {...register("productTag")}
                            type="text"
                            className="form-control"
                            placeholder="Product Tag"
                          />
                          <label>Product Tag</label>
                        </div>
                        {/* short Description */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Short Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={shortDescription}
                            config={config1}
                            onBlur={shortDescriptionOnChange}
                            onChange={(newContent) => {}}
                          />
                          <span className="text-danger">
                            {errorList.shortDescription}
                          </span>
                        </div>
                        {/* Description */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Description <span className="text-danger">*</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={onDescriptiChange}
                            onChange={(newContent) => {}}
                          />
                          <span className="text-danger">
                            {errorList.description}
                          </span>
                        </div>
                        {/* Warranty Type */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Warranty Type <span className="text-danger">*</span>
                          </label>
                          <div className="d-flex">
                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                id="radio"
                                {...register("warrantyType")}
                                defaultValue="international-manufacturer-warranty"
                              />
                              <label
                                onClick={() => setWarranty(true)}
                                className="form-check-label"
                                htmlFor="radio"
                              >
                                International Manufacturer Warranty
                              </label>
                            </div>

                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                {...register("warrantyType")}
                                defaultValue="non-local-warranty"
                                id="radio1"
                              />
                              <label
                                onClick={() => setWarranty(true)}
                                className="form-check-label"
                                htmlFor="radio1"
                              >
                                Non-local warranty
                              </label>
                            </div>

                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                {...register("warrantyType")}
                                defaultValue="local-seller-warranty"
                                id="radio2"
                              />
                              <label
                                onClick={() => setWarranty(true)}
                                className="form-check-label"
                                htmlFor="radio2"
                              >
                                Local seller warranty
                              </label>
                            </div>
                          </div>

                          <div className="d-flex">
                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                {...register("warrantyType")}
                                defaultValue="no-warranty"
                                defaultChecked
                                id="radio3"
                              />
                              <label
                                onClick={() => setWarranty(false)}
                                className="form-check-label"
                                htmlFor="radio3"
                              >
                                No Warranty
                              </label>
                            </div>

                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                {...register("warrantyType")}
                                defaultValue="international-seller-warranty"
                                id="radio4"
                              />
                              <label
                                onClick={() => setWarranty(false)}
                                className="form-check-label"
                                htmlFor="radio4"
                              >
                                International Seller Warranty
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* Warranty Period */}
                        {warranty && (
                          <div className="form-floating mb-4">
                            <select
                              {...register("warrantyPeriod")}
                              className="form-select"
                            >
                              <option value={null}> ---select--- </option>
                              {warrantyOptions.map((data, index) => (
                                <option key={index} value={data}>
                                  {data}
                                </option>
                              ))}
                            </select>
                            <label>
                              Warranty Period
                              <span className="text-danger fs-5"> *</span>
                            </label>
                          </div>
                        )}

                        <div className="row">
                          <div className="col">
                            {/* Warranty Policy */}
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Warranty Policy"
                                {...register("warrantyPolicy")}
                              />
                              <label>Warranty Policy</label>
                            </div>
                          </div>
                          <div className="col">
                            {/* Video URL */}
                            <div className="form-floating mb-3">
                              <input
                                {...register("videoURL")}
                                type="text"
                                className="form-control"
                                placeholder="Video URL"
                              />
                              <label>Video URL</label>
                            </div>
                          </div>
                        </div>

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
                                id="status"
                                defaultValue="Processing"
                                {...register("status")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="status"
                              >
                                Processing
                              </label>
                            </div>

                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="status"
                                id="status1"
                                defaultValue="Published"
                                checked
                                {...register("status")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="status1"
                              >
                                Published
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* isActive */}
                        <div className="form-check mx-2">
                          <input
                            {...register("isActive")}
                            className="form-check-input"
                            id="isActive"
                            type="checkbox"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="isActive"
                          >
                            isActive
                          </label>
                        </div>
                        {/* storeOnly */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            id="storeOnly"
                            {...register("storeOnly")}
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="storeOnly"
                          >
                            Store Only
                          </label>
                        </div>
                        {/* productDisplay */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            id="productDisplay"
                            type="checkbox"
                            defaultChecked
                            {...register("productDisplay")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="productDisplay"
                          >
                            Product Display
                          </label>
                        </div>
                        {/* isTranding */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            id="isTranding"
                            type="checkbox"
                            {...register("isTranding")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="isTranding"
                          >
                            isTranding
                          </label>
                        </div>
                        {/* feature */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            id="feature"
                            type="checkbox"
                            {...register("feature")}
                          />
                          <label className="form-check-label" htmlFor="feature">
                            Feature
                          </label>
                        </div>
                        {/* require Documents */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            id="requireDocuments"
                            type="checkbox"
                            {...register("requireDocuments")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="requireDocuments"
                          >
                            Require Documents
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Price, Costs Color & Size */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Price, Costs, Color & Size</h5>
                      </div>
                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          {/* Cost price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Cost price"
                                {...register("costPrice")}
                              />
                              <label>৳ Cost price</label>
                            </div>
                          </div>

                          {/* Sell Price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Sell Price"
                                onChange={(e) => setSellPrice(e.target.value)}
                                value={sellPrice || ""}
                              />

                              <label>
                                ৳ Sell Price
                                <span className="text-danger fs-6">*</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Discount */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Discount %"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                              />
                              <label>Discount %</label>
                            </div>
                          </div>

                          {/* Discount Price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="৳ Discount Price"
                                {...register("discountPrice")}
                                readOnly
                                value={discount && sellPrice - discountPrice}
                              />
                              <label>৳ Discount Price</label>
                            </div>
                          </div>

                          {/* Discount Time */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="datetime-local"
                                className="form-control"
                                placeholder="Discount Period / Time"
                                {...register("discountPeriod")}
                              />
                              <label>Discount Period / Time</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Total Sell Percentage */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                onChange={(e) =>
                                  setSellPercentage(e.target.value)
                                }
                                placeholder="sell Percentage %"
                                value={sellPercentage || ""}
                              />
                              <label>
                                Sell Percentage %
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>

                          {/* Profit Margin */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Profit Margin (৳)"
                                onChange={(e) => setSendValue(e.target.value)}
                                value={sendValue}
                                readOnly
                              />
                              <label>
                                Profit Margin (৳)
                                <span className="text-danger"> *</span>
                              </label>
                              {/* <span className="text-danger">
                                {errors.profitMargin && "Profit Margin is required"}
                              </span> */}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Tax Price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Tax Price"
                                {...register("taxPrice")}
                              />
                              <label>৳ Tax Price</label>
                            </div>
                          </div>

                          {/* Weight */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Weight"
                                {...register("weight")}
                              />
                              <label>Weight</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Unit */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Unit"
                                {...register("unit")}
                              />
                              <label>Unit</label>
                            </div>
                          </div>

                          {/* Material */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Material"
                                {...register("material")}
                              />
                              <label>Material</label>
                            </div>
                          </div>

                          {/* CountIn Stock */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("countInStock")}
                                type="number"
                                min="0"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="CountIn Stock"
                              />
                              <label>Count In Stock</label>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          {/* color */}
                          <div className="col">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Color"
                                {...register("color")}
                              />
                              <label>Color</label>
                            </div>
                          </div>

                          {/* Size */}
                          <div className="col">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Size"
                                {...register("size")}
                              />
                              <label>Size</label>
                            </div>
                          </div>
                        </div>

                        {/* call For Price */}
                        <div className="form-check mx-2">
                          <input
                            {...register("callForPrice")}
                            className="form-check-input"
                            type="checkbox"
                            value="1"
                            id="callForPrice"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="callForPrice"
                          >
                            Call For Price
                          </label>
                        </div>
                        {/* On Sale */}
                        <div className="form-check mx-2">
                          <input
                            {...register("onSale")}
                            className="form-check-input"
                            type="checkbox"
                            value="1"
                            id="onSale"
                          />
                          <label className="form-check-label" htmlFor="onSale">
                            On Sale
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Return Policy */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Shipping & Return Policy</h5>
                      </div>
                      <div className="formStyle px-5 py-3">
                        {/* Shipping & Return Policy */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Shipping & Return Policy
                            <span className="text-danger"> *</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={shippingReturnPolicy}
                            config={config1}
                            onBlur={ShippingReturnPolicyOnChange}
                            onChange={(newContent) => {}}
                          />
                          <span className="text-danger">
                            {errorList.shippingReturnPolicy}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* optimization */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Optimization</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          {/* Mate Tag */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                {...register("metaTag", { required: true })}
                                type="text"
                                className="form-control"
                                placeholder="Mate Tag"
                              />
                              <label>
                                Mate Tag <span className="text-danger"> *</span>
                              </label>
                              <span className="text-danger">
                                {errors.metaTag && "Meta Tag is required"}
                              </span>
                            </div>
                          </div>
                          {/* Mate keyword */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                {...register("focusKeyword", {
                                  required: true,
                                })}
                                type="text"
                                className={`form-control ${
                                  errors.focusKeyword ? "is-invalid" : ""
                                }`}
                                placeholder="Focus keyword"
                              />
                              <label>
                                Focus keyword{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <span className="text-danger">
                                {errors.focusKeyword &&
                                  "Focus keyword is required"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* textarea */}
                        <div className="form-floating mb-3">
                          <textarea
                            {...register("metaDescription", { required: true })}
                            className={`form-control ${
                              errors.metaDescription ? "is-invalid" : ""
                            }`}
                            placeholder="Mate Description"
                          ></textarea>
                          <label>
                            Mate Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <span className="text-danger">
                            {errors.metaDescription &&
                              "Mate keyword is required"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* button */}
                    <div className="card shadow-sm my-3 p-3">
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="me-3">
                          <Link className="myButton" to="/products">
                            <FaUndo /> Back
                          </Link>
                        </div>
                        <div>
                          <button type="submit" className="myButton">
                            <FaSave /> {saveButton}
                          </button>
                        </div>
                      </div>
                    </div>
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

export default Create;
