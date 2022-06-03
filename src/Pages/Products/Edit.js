import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaSave, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import {
  addCategory,
  childCategoryList,
  subChildCategoryList,
} from "../../redux/Actions/categoryAction";
import { getEntrepreneurs } from "../../redux/Actions/entrepreneursActions";
import {
  productDetails,
  updateProduct,
} from "../../redux/Actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../redux/Constants/productContants";
import { config, config1, warrantyOptions } from "./Util";

const Edit = () => {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const editor = useRef(null);

  // product form state
  const [loadingUpload, setLoadingUpload] = useState("");
  const [saveButton, setSaveButton] = useState("Save");
  const [productName, setproductName] = useState("");
  const [productCode, setproductCode] = useState("");
  const [mainCategory, setMainCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [entrepreneur, setEntrepreneur] = useState([]);
  const [model, setmodel] = useState("");
  const [displayImage, setDisplayImage] = useState(" ");
  const [productDetailsImgs, setProductDetailsImgs] = useState([]);
  const [productTag, setproductTag] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [warrantyType, setwarrantyType] = useState("");
  const [warrantyPeriod, setwarrantyPeriod] = useState("");
  const [warrantyPolicy, setwarrantyPolicy] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [isActive, setisActive] = useState(false);
  const [storeOnly, setstoreOnly] = useState(false);
  const [productDisplay, setproductDisplay] = useState(false);
  const [isTranding, setisTranding] = useState(false);
  const [feature, setfeature] = useState(false);
  const [requireDocuments, setrequireDocuments] = useState(false);
  const [costPrice, setcostPrice] = useState("");
  const [sellPrice, setsellPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountPeriod, setDiscountPeriod] = useState("");
  const [taxPrice, settaxPrice] = useState("");
  const [weight, setweight] = useState("");
  const [unit, setunit] = useState("");
  const [material, setmaterial] = useState("");
  const [sellPercentage, setSellPercentage] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [minimumSell, setMinimumSell] = useState(0);
  const [maximumSell, setMaximumSell] = useState("");
  const [color, setcolor] = useState("");
  const [size, setsize] = useState([]);
  const [callForPrice, setcallForPrice] = useState(false);
  const [onSale, setonSale] = useState(false);
  const [shippingReturnPolicy, setShippingReturnPolicy] = useState("");
  const [metaTag, setMetaTag] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // profit margin calculation
  const profit__Margin = (sell__price, sell__percentage) => {
    const total =
      (parseFloat(sell__price) * parseFloat(sell__percentage).toFixed(2)) / 100;
    return parseFloat(total).toFixed(2);
  };

  // discount price
  const discount_Price = (sell__Price, sell__Percentage) => {
    const total =
      (parseFloat(sell__Price) * parseFloat(sell__Percentage)) / 100;
    return parseFloat(total).toFixed(2);
  };

  useEffect(() => {
    setDiscountPrice(discount_Price(sellPrice, discount));
  }, [sellPrice, discount]);

  // product update
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success, error } = productUpdate;

  // all category
  const allCategory = useSelector((state) => state.category);
  const { categories } = allCategory;

  // chaildCategory
  const chaildCategory = useSelector((state) => state.chaildCategory);
  const { categoryChild } = chaildCategory;

  // sub childcategory
  const subChildCategory = useSelector((state) => state.subChildCategory);
  const { subCategoryChild } = subChildCategory;

  // product details
  const productSingleData = useSelector((state) => state.productDetail);
  const { product: productEdit } = productSingleData;

  // entrepreneurs
  const allEntrepreneur = useSelector((state) => state.entrepreneurs);
  const { entrepreneurs } = allEntrepreneur;

  // all category
  useEffect(() => {
    dispatch(getEntrepreneurs({ pageSize: 1000 }));
    dispatch(addCategory());
  }, [dispatch]);

  // childCategoryList
  useEffect(() => {
    if (mainCategory) {
      dispatch(
        childCategoryList({
          id: mainCategory[0]?.mainCategoryId || mainCategory?.mainCategoryId,
        })
      );
    }
  }, [dispatch, mainCategory]);

  // subchild category
  useEffect(() => {
    if (category) {
      dispatch(
        subChildCategoryList({
          id: category[0]?.categoryId || category?.categoryId,
        })
      );
    }
  }, [dispatch, category]);

  // product details
  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (success) {
      history.push("/products");
    }
    if (!productEdit || productEdit._id !== productId || success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      setproductName(productEdit.name); // string
      setproductCode(productEdit.productCode); // string
      setMainCategory(productEdit.mainCategory); // array
      setCategory(productEdit.category); // array
      setSubCategory(productEdit.subCategory); // array
      setEntrepreneur(productEdit.entrepreneur); // array
      setmodel(productEdit.model); // sring
      setDisplayImage(productEdit.displayImage); // single array
      setProductDetailsImgs(productEdit.productDetailsImgs); // array
      setproductTag(productEdit.tag); // string
      setShortDescription(productEdit.shortDescription); // string
      setDescription(productEdit.description); // string
      setwarrantyType(productEdit.warrantyType); // string
      setwarrantyPeriod(productEdit.warrantyPeriod); // string
      setwarrantyPolicy(productEdit.warrantyPolicy); // string
      setVideoUrl(productEdit.videoUrl); // string
      setStatus(productEdit.status); // boolen
      setisActive(productEdit.isActive); // boolen
      setstoreOnly(productEdit.storeOnly); // boolen
      setproductDisplay(productEdit.productDisplay); // boolen
      setisTranding(productEdit.isTranding); // boolen
      setfeature(productEdit.feature); // boolen
      setrequireDocuments(productEdit.requireDocuments); // boolen
      setcostPrice(productEdit.costPrice); // string
      setsellPrice(productEdit.sellPrice); // string
      setDiscount(productEdit.discount); // string
      setDiscountPrice(productEdit.discountPrice); // string
      setDiscountPeriod(productEdit.discountPeriod); // string
      settaxPrice(productEdit.taxPrice); // string
      setweight(productEdit.weight); // string
      setunit(productEdit.unit); // string
      setmaterial(productEdit.material); // string
      setSellPercentage(productEdit.sellPercentage); // string
      setProfitMargin(productEdit.profitMargin);
      setCountInStock(productEdit.countInStock);
      setMinimumSell(productEdit.minimumSell); //number
      setMaximumSell(productEdit.maximumSell); //number
      setcolor(productEdit.color); // array
      setsize(productEdit.size); // array
      setcallForPrice(productEdit.callForPrice); // boolen
      setonSale(productEdit.onSale); // boolen
      setShippingReturnPolicy(productEdit.shippingAndReturnPolicy); // string
      setMetaTag(productEdit.metaTag); // string
      setFocusKeyword(productEdit.focusKeyword); // string
      setSlug(productEdit.slug); // string
      setMetaDescription(productEdit.metaDescription); // string
    }
  }, [dispatch, history, productEdit, productId, success]);

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
  // -------------------------  image upload --------------------------
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

  // product details
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

    const detailsImage = [...productDetailsImgs, ...data];
    setLoadingUpload("");
    setProductDetailsImgs(detailsImage);
  };

  // upload image delete
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

  // multiple image delete
  const MultiImageDeletehandler = (data) => {
    if (window.confirm("Are you sure to delete?")) {
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      const newData = productDetailsImgs.filter((x) => x.url !== data.url);
      setProductDetailsImgs(newData);
    }
  };

  // warrantyt period
  let Warranty__Period;
  if (
    warrantyType === "no-warranty" ||
    warrantyType === "international-seller-warranty"
  ) {
    Warranty__Period = " ";
  } else {
    Warranty__Period = (
      <div className="form-floating mb-4">
        <select
          onChange={(e) => setwarrantyPeriod(e.target.value)}
          className="form-select"
        >
          <option value={" "}> --- select ---</option>
          {warrantyOptions.map((data, index) => (
            <option selected={data === warrantyPeriod} key={index} value={data}>
              {data}
            </option>
          ))}
        </select>
        <label>
          Warranty Period <span className="text-danger fs-5"> *</span>
        </label>
      </div>
    );
  }

  const mainCathandleChange = (e) => {
    const mainCatData = e.target.value.split("-");
    const mainCategoryData = {
      mainCategoryId: mainCatData[0],
      mainCategoryName: mainCatData[1],
    };
    setMainCategory(mainCategoryData);
  };

  const CathandleChange = (e) => {
    const CatData = e.target.value.split("-");
    const CategoryData = {
      categoryId: CatData[0],
      categoryName: CatData[1],
    };
    setCategory(CategoryData);
  };

  const subCathandleChange = (e) => {
    const subCatData = e.target.value.split("-");
    const subCategoryData = {
      subCategoryId: subCatData[0],
      subCategoryName: subCatData[1],
    };
    setSubCategory(subCategoryData);
  };

  // --------------------- form submit ----------------------
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveButton("Save...");
    const productInfo = {
      _id: productId,
      name: productName,
      productCode: productCode,
      mainCategory: mainCategory,
      category: category,
      subCategory: subCategory,
      entrepreneur: entrepreneur,
      model: model,
      displayImage: displayImage,
      productDetailsImgs: productDetailsImgs,
      tag: productTag,
      shortDescription: shortDescription,
      description: description,
      warrantyType: warrantyType,
      warrantyPeriod: warrantyType === "no-warranty" ? " " : warrantyPeriod,
      warrantyPolicy: warrantyPolicy,
      videoUrl: videoUrl,
      status: status,
      isActive: isActive,
      storeOnly: storeOnly,
      productDisplay: productDisplay,
      isTranding: isTranding,
      feature: feature,
      requireDocuments: requireDocuments,
      costPrice: costPrice,
      sellPrice: sellPrice,
      discount: discount,
      discountPrice: discountPrice,
      discountPeriod: discountPeriod,
      taxPrice: taxPrice,
      weight: weight,
      unit: unit,
      material: material,
      sellPercentage: sellPercentage,
      profitMargin: profitMargin,
      countInStock: countInStock,
      minimumSell: minimumSell,
      maximumSell: maximumSell,
      color: color,
      size: size,
      callForPrice: callForPrice,
      onSale: onSale,
      shippingAndReturnPolicy: shippingReturnPolicy,
      metaTag: metaTag,
      focusKeyword: focusKeyword,
      slug: slug,
      metaDescription: metaDescription,
    };

    dispatch(updateProduct(productInfo));
  };

  useEffect(() => {
    if (success) {
      localStorage.setItem("multipleImage", JSON.stringify(""));
      history.push("/products");
      setSaveButton("Save");
    } else if (error) {
      setSaveButton("Save");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [success, history, error]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>
            <div className="ds_body h-100 w-100">
              <Breadcrumb title="Product Edit" url="/products"></Breadcrumb>
              {/* product upload form */}
              <div className="row justify-content-center">
                <div className="col-8">
                  <form onSubmit={handleSubmit}>
                    {/* product information */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        {error && (
                          <div className="alert alert-warning" role="alert">
                            {error}
                          </div>
                        )}
                        <h5 className="boldh5">Product Information</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          <div className="col-8">
                            {/* product name */}
                            <div className="form-floating mb-3">
                              <input
                                onChange={(e) => setproductName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Product Name"
                                defaultValue={productName}
                              />
                              <label>
                                Product Name
                                <span className="text-danger fs-5"> *</span>
                              </label>
                            </div>
                          </div>

                          <div className="col-4">
                            {/* product code */}
                            <div className="form-floating mb-3">
                              <input
                                onChange={(e) => setproductCode(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Product Code"
                                value={productCode}
                              />
                              <label>
                                Product Code{" "}
                                <span className="text-danger fs-5">*</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* product category */}
                        <div className="row">
                          <div className="col">
                            {/* main category */}
                            <div className="form-floating">
                              <select
                                onChange={mainCathandleChange}
                                className="form-select"
                                defaultValue={mainCategory[0]?.mainCategoryName}
                              >
                                {categories?.categoryList?.map((x) => (
                                  <option
                                    key={x._id}
                                    selected={
                                      x.name ===
                                      mainCategory[0]?.mainCategoryName
                                    }
                                    value={x._id + "-" + x.name}
                                  >
                                    {x.name}
                                  </option>
                                ))}
                              </select>
                              <label>
                                Main Category
                                <span className="text-danger fs-5">*</span>
                              </label>
                            </div>
                          </div>

                          <div className="col">
                            <div className="form-floating">
                              <select
                                onChange={CathandleChange}
                                className="form-select"
                                defaultValue={category[0]?.categoryName}
                              >
                                {categoryChild?.map((x) => (
                                  <option
                                    key={x._id}
                                    selected={
                                      x.name === category[0]?.categoryName
                                    }
                                    value={x._id + "-" + x.name}
                                  >
                                    {x.name}
                                  </option>
                                ))}
                              </select>
                              <label>
                                Category{" "}
                                <span className="text-danger fs-5">*</span>
                              </label>
                            </div>
                          </div>

                          <div className="col">
                            <div className="form-floating">
                              <select
                                onChange={subCathandleChange}
                                className="form-select"
                                defaultValue={subCategory[0]?.subCategoryName}
                              >
                                {subCategoryChild?.map((x) => (
                                  <option
                                    key={x._id}
                                    selected={
                                      x.name === subCategory[0]?.subCategoryName
                                    }
                                    value={x._id + "-" + x.name}
                                  >
                                    {x.name}
                                  </option>
                                ))}
                              </select>
                              <label>Sub Category</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Entrepreneurs */}
                          <div className="col mt-4">
                            <div className="form-floating">
                              <select
                                onChange={(e) =>
                                  setEntrepreneur(e.target.value)
                                }
                                className="form-select"
                              >
                                {entrepreneurs?.entrepreneur?.map((x) => (
                                  <option
                                    key={x._id}
                                    selected={x.name === entrepreneur?.name}
                                    value={x._id}
                                  >
                                    {x.name}
                                  </option>
                                ))}
                              </select>
                              <label>
                                Seller{" "}
                                <span className="text-danger fs-5"> *</span>
                              </label>
                            </div>
                          </div>

                          <div className="col">
                            {/* Model */}
                            <div className="form-floating mt-4">
                              <input
                                onChange={(e) => setmodel(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Product Model"
                                value={model}
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
                            Featured Image
                            <span className="text-danger fs-5"> *</span>
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

                            <Card className="imageUpload p-1 me-3">
                              <img
                                src={
                                  !displayImage
                                    ? defaultImage
                                    : displayImage?.data?.url
                                }
                                alt=""
                              />
                              {displayImage !== "" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleImageDelete(
                                      displayImage.data,
                                      "single"
                                    )
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
                        </div>
                        {/* More Product Image */}
                        <div className="my-3">
                          <label className="form-label">
                            More Product Image
                            <span className="text-danger fs-5"> *</span>
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

                            {productDetailsImgs?.map((img) => (
                              <div className="imageUpload" key={img.id}>
                                <Card
                                  className="p-1"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  <img src={img.url} alt="" />
                                  <button
                                    type="button"
                                    onClick={() => MultiImageDeletehandler(img)}
                                    className="imageDelete"
                                  >
                                    <BsTrash />
                                  </button>
                                </Card>
                              </div>
                            ))}
                            {loadingUpload === "multiple" && (
                              <div className="ms-2">
                                <CircularProgress color="inherit" />
                              </div>
                            )}
                          </div>
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
                            onChange={(e) => setproductTag(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Product Tag"
                            value={productTag}
                          />
                          <label>Product Tag</label>
                        </div>

                        {/* short Description */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Short Description
                            <span className="text-danger fs-5"> *</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={shortDescription}
                            config={config1}
                            onBlur={shortDescriptionOnChange}
                            onChange={(newContent) => {}}
                          />
                        </div>

                        {/* Description */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Description{" "}
                            <span className="text-danger fs-5"> *</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={onDescriptiChange}
                            onChange={(newContent) => {}}
                          />
                        </div>

                        {/* Warranty Type */}
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            Warranty Type{" "}
                            <span className="text-danger fs-5">*</span>
                          </label>
                          <div className="d-flex">
                            <div className="form-check mx-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="warrantyType"
                                id="radio"
                                defaultValue="international-manufacturer-warranty"
                                checked={
                                  warrantyType ===
                                  "international-manufacturer-warranty"
                                }
                                onChange={(e) =>
                                  setwarrantyType(e.target.value)
                                }
                              />
                              <label
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
                                defaultValue="non-local-warranty"
                                id="radio1"
                                checked={warrantyType === "non-local-warranty"}
                                onChange={(e) =>
                                  setwarrantyType(e.target.value)
                                }
                              />
                              <label
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
                                defaultValue="local-seller-warranty"
                                id="radio2"
                                checked={
                                  warrantyType === "local-seller-warranty"
                                }
                                onChange={(e) =>
                                  setwarrantyType(e.target.value)
                                }
                              />
                              <label
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
                                defaultValue="no-warranty"
                                id="radio3"
                                checked={warrantyType === "no-warranty"}
                                onChange={(e) =>
                                  setwarrantyType(e.target.value)
                                }
                              />
                              <label
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
                                defaultValue="international-seller-warranty"
                                id="radio4"
                                checked={
                                  warrantyType ===
                                  "international-seller-warranty"
                                }
                                onChange={(e) =>
                                  setwarrantyType(e.target.value)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="radio4"
                              >
                                International Seller Warranty
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Warranty Period */}
                        {Warranty__Period}

                        <div className="row">
                          {/* Warranty Policy */}
                          <div className="col">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Warranty Policy"
                                onChange={(e) =>
                                  setwarrantyPolicy(e.target.value)
                                }
                                defaultValue={warrantyPolicy}
                              />
                              <label>Warranty Policy</label>
                            </div>
                          </div>
                          {/* Video URL */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Video URL"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
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
                                checked={status === "Processing"}
                                onChange={(e) => setStatus(e.target.value)}
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
                                checked={status === "Published"}
                                onChange={(e) => setStatus(e.target.value)}
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
                            className="form-check-input"
                            id="isActive"
                            type="checkbox"
                            checked={isActive ? "checked" : ""}
                            defaultValue={isActive}
                            onChange={() => setisActive(!isActive)}
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
                            type="checkbox"
                            checked={storeOnly ? "checked" : ""}
                            defaultValue={storeOnly}
                            onChange={() => setstoreOnly(!storeOnly)}
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
                            checked={productDisplay ? "checked" : ""}
                            defaultValue={productDisplay}
                            onChange={() => setproductDisplay(!productDisplay)}
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
                            checked={isTranding ? "checked" : ""}
                            defaultValue={isTranding}
                            onChange={() => setisTranding(!isTranding)}
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
                            checked={feature ? "checked" : ""}
                            defaultValue={feature}
                            onChange={() => setfeature(!feature)}
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
                            checked={requireDocuments ? "checked" : ""}
                            defaultValue={requireDocuments}
                            onChange={() =>
                              setrequireDocuments(!requireDocuments)
                            }
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
                        {/* Cost price */}
                        <div className="row">
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Cost price"
                                onChange={(e) => setcostPrice(e.target.value)}
                                value={costPrice}
                              />
                              <label>৳ Cost price</label>
                            </div>
                          </div>

                          {/* Sell Price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Sell Price"
                                onChange={(e) => setsellPrice(e.target.value)}
                                value={sellPrice}
                              />
                              <label>
                                ৳ Sell Price
                                <span className="text-danger fs-5">*</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* discount */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Discount %"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
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
                                onChange={(e) =>
                                  setDiscountPeriod(e.target.value)
                                }
                                value={discountPeriod}
                              />
                              <label>Discount Period / Time</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* total Sell Percentage */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Total Sell Percentage"
                                onChange={(e) =>
                                  setSellPercentage(e.target.value)
                                }
                                value={sellPercentage}
                              />
                              <label>
                                ৳ Sell Percentage
                                <span className="text-danger fs-5"> *</span>
                              </label>
                            </div>
                          </div>
                          {/* Profit Margin */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Profit Margin"
                                onChange={(e) =>
                                  setProfitMargin(e.target.value)
                                }
                                value={profit__Margin(
                                  sellPrice,
                                  sellPercentage
                                )}
                                readOnly
                              />
                              <label>
                                Profit Margin{" "}
                                <span className="text-danger"> *</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Tax Price */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Tax Price"
                                onChange={(e) => settaxPrice(e.target.value)}
                                value={taxPrice}
                              />
                              <label>৳ Tax Price</label>
                            </div>
                          </div>
                          {/* Weight */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                min="1"
                                className="form-control"
                                placeholder="Weight"
                                onChange={(e) => setweight(e.target.value)}
                                value={weight}
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
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Unit"
                                onChange={(e) => setunit(e.target.value)}
                                value={unit}
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
                                onChange={(e) => setmaterial(e.target.value)}
                                value={material}
                              />
                              <label>Material</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Count in Stock */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Count In Stock"
                                onChange={(e) =>
                                  setCountInStock(e.target.value)
                                }
                                value={countInStock}
                              />
                              <label>Count In Stock</label>
                            </div>
                          </div>
                          {/* Minimum Sell */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Minimum Sell"
                                onChange={(e) => setMinimumSell(e.target.value)}
                                value={minimumSell}
                              />
                              <label>
                                Minimum Sell
                                <span className="text-danger fs-5">*</span>
                              </label>
                            </div>
                          </div>

                          {/* Maxmum Sell */}
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                min="1"
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                                placeholder="Maximum Sell"
                                value={maximumSell}
                                onChange={(e) => setMaximumSell(e.target.value)}
                              />
                              <label>Maximum Sell</label>
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
                                value={color}
                                onChange={(e) => setcolor(e.target.value)}
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
                                value={size}
                                onChange={(e) => setsize(e.target.value)}
                              />
                              <label>Size</label>
                            </div>
                          </div>
                        </div>

                        {/* call For Price */}
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="1"
                            id="callForPrice"
                            checked={callForPrice ? "checked" : ""}
                            defaultValue={callForPrice}
                            onChange={() => setcallForPrice(!callForPrice)}
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
                            className="form-check-input"
                            type="checkbox"
                            value="1"
                            id="onSale"
                            checked={onSale ? "checked" : ""}
                            onChange={() => setonSale(!onSale)}
                            defaultValue={onSale}
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
                            <span className="text-danger fs-5"> *</span>
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={shippingReturnPolicy}
                            config={config1}
                            onBlur={ShippingReturnPolicyOnChange}
                            onChange={(newContent) => {}}
                          />
                        </div>
                      </div>
                    </div>

                    {/* optization */}
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Optization</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          {/* Mate Tag */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mate Tag"
                                value={metaTag}
                                onChange={(e) => setMetaTag(e.target.value)}
                              />
                              <label>Mate Tag</label>
                            </div>
                          </div>
                          {/* Mate keyword */}
                          <div className="col-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Focus Keyword"
                                value={focusKeyword}
                                onChange={(e) =>
                                  setFocusKeyword(e.target.value)
                                }
                              />
                              <label>
                                Focus Keyword
                                <span className="text-danger fs-6"> *</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* product slug */}
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="product slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                          />
                          <label>
                            product slug
                            <span className="text-danger fs-5"> *</span>
                          </label>
                        </div>
                        {/* textarea */}
                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control"
                            placeholder="Mate Description"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                          ></textarea>
                          <label>
                            Mate Description
                            <span className="text-danger fs-5"> *</span>
                          </label>
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

export default Edit;
