/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useMemo, useState } from "react";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { allProduct, deleteProduct } from "../../redux/Actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../redux/Constants/productContants";
import { CSVLink } from "react-csv";

const Products = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // get all product
  const getProduct = useSelector((state) => state.products);
  const { products } = getProduct;

  // product create success
  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate } = productCreate;
  // product delete
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  // product update
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  // react hook
  const [name, setName] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [showTotalPagination, setShowTotalPagination] = useState({
    start: 0,
    end: 3,
  });

  // all actions
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }

    dispatch(
      allProduct({
        name: name !== "all" ? name : "",
        pageNumber: data,
        pageSize: 50,
      })
    );
  }, [dispatch, history, successDelete, successCreate, successUpdate]);

  const data = useMemo(
    () =>
      products?.products?.map((data) => ({
        id: data._id,
        image: data.displayImage.data?.url,
        name: data.name,
        sellPrice: `${data.sellPrice} Tk`,
        productCode: data.productCode,
        countInStock: data.countInStock,
      })),
    [products]
  );

  let pageSize = [];

  for (let i = 1; i <= products?.pages; i++) {
    pageSize.push(i);
  }

  // delete
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product));
    }
  };

  // pagination
  const handlePagination = (data) => {
    dispatch(allProduct({ pageNumber: data, pageSize: 10 }));
    setPageNumber(data);
    setShowTotalPagination({ start: data - 1, end: data + 2 });
  };

  // search button
  const handleSearchButton = (e) => {
    e.preventDefault();
    dispatch(allProduct({ productCode: productSearch }));
  };

  // clear button
  const handleClearButton = () => {
    handlePagination(1);
    setProductSearch("");
    dispatch(allProduct({ name: "" }));
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
              <div className="row">
                <Breadcrumb title="Products" url="/product/create"></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <form className="d-flex formStyle">
                      <div>
                        <input
                          type="text"
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          style={{ width: 300 }}
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                      <button
                        onClick={handleSearchButton}
                        type="submit"
                        className="searchButton"
                      >
                        Search
                      </button>
                      <button
                        onClick={handleClearButton}
                        type="button"
                        className="searchButton"
                      >
                        Clear
                      </button>
                    </form>

                    <Link to={"/product/create"} className="myButton">
                      <BsPlus style={{ fontSize: "23px" }} /> Create
                    </Link>
                    {data ? (
                      <CSVLink data={data} className="btn btn-info">
                        CSV
                      </CSVLink>
                    ) : (
                      "Loading.. ."
                    )}
                  </div>

                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">ProductCode</th>
                        <th scope="col">countInStock</th>
                        <th scope="col">SellPrice</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody style={{ borderTop: 0 }}>
                      {products?.products?.map((product) => {
                        return (
                          <tr>
                            <th>
                              <div style={{ width: "70px", height: "70px" }}>
                                <img
                                  style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                  className="shadow-sm"
                                  src={product?.displayImage?.data?.url}
                                  width={60}
                                  alt="Image"
                                />
                              </div>
                            </th>

                            <td>{product.name}</td>
                            <td>{product.productCode}</td>
                            <td>
                              {product.countInStock
                                ? product.countInStock
                                : "TBD"}
                            </td>
                            <td>৳ {product.sellPrice}</td>
                            <td>
                              <Link
                                to={`/product/${product._id}/edit`}
                                className="me-1 adminBtnButton"
                              >
                                <BsPencil className="pencilButton" />
                              </Link>

                              <button
                                className="adminBtnButton"
                                type="button"
                                onClick={() => deleteHandler(product._id)}
                              >
                                <BsTrash className="trashButton" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <nav className="d-flex justify-content-end">
                    <ul className="pagination">
                      {
                        // disabled
                        pageNumber === 1 ? (
                          <li className={`page-item disabled`}>
                            <Link className="page-link" to="#">
                              Previous
                            </Link>
                          </li>
                        ) : (
                          <li
                            onClick={() => handlePagination(1)}
                            className={`page-item`}
                          >
                            <Link className="page-link" to="#">
                              Previous
                            </Link>
                          </li>
                        )
                      }

                      {pageSize
                        .slice(
                          showTotalPagination.start,
                          showTotalPagination.end
                        )
                        .map((index) => {
                          return (
                            <li
                              onClick={() => handlePagination(index)}
                              className={`page-item ${
                                index === pageNumber ? "active" : " "
                              }`}
                            >
                              <Link className="page-link" to="#">
                                {index}
                              </Link>
                            </li>
                          );
                        })}

                      {pageSize?.length === pageNumber ? (
                        <li className="page-item disabled">
                          <Link className={`page-link`} to="#">
                            Next
                          </Link>
                        </li>
                      ) : (
                        <li className="page-item">
                          <Link
                            className={`page-link`}
                            onClick={() => handlePagination(pageSize.length)}
                            to="#"
                          >
                            Next
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
