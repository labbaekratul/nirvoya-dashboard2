/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsExclamationDiamond, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { deleteOrder, getOrders } from "../../redux/Actions/orderActions";
import {
  ORDER_CREATE_RESET,
  ORDER_DELETE_RESET,
  ORDER_UPDATE_RESET,
} from "../../redux/Constants/orderConstants";
import { CSVLink } from "react-csv";

const Orders = () => {
  const dispatch = useDispatch();
  const [orderSearch, setOrderSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [showTotalPagination, setShowTotalPagination] = useState({
    start: 0,
    end: 3,
  });

  // get order
  const getorders = useSelector((state) => state.orders);
  const { orders } = getorders;
  // order create
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: successCreate } = orderCreate;
  // order update
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { success: successUpdate } = orderUpdate;
  // order delete
  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  useEffect(() => {
    // get order
    dispatch(getOrders({}));
    // create order
    if (successCreate) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // update order
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
    }
    // delete order
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // delete order handle
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(id));
    }
  };

  let pageSize = [];

  for (let i = 1; i <= orders?.pages; i++) {
    pageSize.push(i);
  }

  // pagination
  const handlePagination = (data) => {
    dispatch(getOrders({ pageNumber: data, pageSize: 10 }));
    setPageNumber(data);
    setShowTotalPagination({ start: data - 1, end: data + 2 });
  };

  // search button
  const handleSearchButton = () => {
    dispatch(getOrders({ orderId: orderSearch }));
  };

  // clear button
  const handleClearButton = () => {
    handlePagination(1);
    setOrderSearch("");
    dispatch(getOrders({ name: "" }));
  };

  let csvData = [];
  orders?.orders?.map((item) =>
    csvData.push({
      OderId: item.orderId,
      Items: item?.orderItems?.map((x) => x?.name),
      UserName: item.shippingAddress.fullName,
      Phone: item.shippingAddress.phone,
      GrandTotal: item.grandTotal,
      SubToatal: item.subTotal,
      ShippingPrice: item.shippingPrice,
      ShippingAddress: item.shippingAddress.address,
      PaymentMethod: item.paymentMethod,
      OrderStatus: item.orderStatus,
      IsPaid: item.isPaid,
      Date: item.createdAt,
    })
  );

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
                <Breadcrumb title="Orders" url="/order/create"></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <form className="d-flex formStyle">
                      <div>
                        <input
                          type="text"
                          value={orderSearch}
                          onChange={(e) => setOrderSearch(e.target.value)}
                          style={{ width: 300 }}
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                      <button
                        onClick={handleSearchButton}
                        type="button"
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

                    <Link to={"/order/create"} className="myButton">
                      <BsPlus style={{ fontSize: "23px" }} /> Create
                    </Link>
                    {csvData ? (
                      <CSVLink data={csvData} className="btn btn-info">
                        CSV
                      </CSVLink>
                    ) : (
                      "Loading.. ."
                    )}
                  </div>

                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Grand Total</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Received At</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody style={{ borderTop: 0 }}>
                      {orders?.orders?.map((order) => {
                        return (
                          <tr>
                            <td className="text-uppercase">{order.orderId}</td>
                            <td>{order.shippingAddress.fullName}</td>
                            <td>{order.shippingAddress.phone}</td>
                            <td>৳ {order.grandTotal.toFixed(2)}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.createdAt.split("T")[0]}</td>
                            <td>
                              <Link
                                to={`/order/${order._id}/details`}
                                className="me-1 adminBtnButton"
                              >
                                <BsExclamationDiamond className="pencilButton" />
                              </Link>

                              <button
                                className="adminBtnButton"
                                type="button"
                                onClick={() => deleteHandler(order._id)}
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

export default Orders;
