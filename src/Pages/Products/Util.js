import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/Actions/categoryAction";
import { addColors } from "../../redux/Actions/colorActions";
import { getEntrepreneurs } from "../../redux/Actions/entrepreneursActions";
import { getSizes } from "../../redux/Actions/sizeActions";

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

const Util = () => {
  const dispatch = useDispatch();
  // all categories
  const Category = useSelector((state) => state.category);
  const { categories } = Category;
  // chaild Category
  const chaildCategory = useSelector((state) => state.chaildCategory);
  const { categoryChild } = chaildCategory;
  // subChaild Category
  const subChildCategoryList = useSelector((state) => state.subChildCategory);
  const { subCategoryChild } = subChildCategoryList;
  // size list
  const allsize = useSelector((state) => state.sizes);
  const { sizes } = allsize;
  // color list
  const allcolor = useSelector((state) => state.colors);
  const { colors } = allcolor;
  // entrepreneurs
  const allEntrepreneur = useSelector((state) => state.entrepreneurs);
  const { entrepreneurs } = allEntrepreneur;

  // all action
  useEffect(() => {
    dispatch(getEntrepreneurs({ pageSize: 1000 }));
    dispatch(getSizes());
    dispatch(addColors());
    dispatch(addCategory());
  }, [dispatch]);

  const mainCategory = categories?.categoryList?.map((data) => ({
    label: data.name,
    value: data._id,
  }));

  const category = categoryChild?.map((data) => ({
    label: data.name,
    value: data._id,
    parentId: data.parentId,
  }));

  const subCategory = subCategoryChild?.map((data) => ({
    label: data.name,
    value: data._id,
    parentId: data.parentId,
  }));

  const colorList = colors?.map((data) => ({
    label: data.name,
    value: data._id,
  }));

  const sizeList = sizes?.map((data) => ({
    label: data.name,
    value: data._id,
  }));

  const entrepreneurList = entrepreneurs?.entrepreneur?.map((data) => ({
    label: data.name,
    value: data._id,
  }));

  return {
    mainCategory,
    category,
    subCategory,
    colorList,
    sizeList,
    entrepreneurList,
  };
};

export default Util;
