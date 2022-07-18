/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { deleteUser, users } from "../../redux/Actions/userAuthAction";
import {
  USER_DELETE_RESET,
  USER_REGISTER_RESET,
  USER_UPDATE_RESET,
} from "../../redux/Constants/userAuthConstant";
import { CSVLink } from "react-csv";

const Users = () => {
  const dispatch = useDispatch();

  const [userSearch, setUserSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [showTotalPagination, setShowTotalPagination] = useState({
    start: 0,
    end: 3,
  });

  // user state
  const getUsers = useSelector((state) => state.users);
  const { users: allUsers } = getUsers;
  // user create
  const userCreate = useSelector((state) => state.userRegister);
  const { success: successCreate } = userCreate;
  // update user
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;
  // delete user
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  // user list dispatch
  useEffect(() => {
    dispatch(users({ phone: "", pageNumber: data, pageSize: 10 }));

    if (successCreate) {
      dispatch({ type: USER_REGISTER_RESET });
    }
    // update user
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    // delete user
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [dispatch, successUpdate, successDelete, successCreate]);

  const data = useMemo(
    () =>
      allUsers?.users?.map((data) => ({
        id: data._id,
        image: data?.image?.url,
        name: data.name,
        phone: data.phone,
        email: data.email,
      })),
    [allUsers]
  );

  // handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(id));
    }
  };

  // pagination
  const handlePagination = (data) => {
    dispatch(users({ pageNumber: data, pageSize: 10 }));
    setPageNumber(data);
    setShowTotalPagination({ start: data - 1, end: data + 2 });
  };

  // search button
  const handleSearchButton = () => {
    dispatch(users({ phone: userSearch }));
  };

  // clear button
  const handleClearButton = () => {
    handlePagination(1);
    setUserSearch("");
    dispatch(users({ phone: "" }));
  };

  // page sizes
  let pageSize = [];
  for (let i = 1; i <= allUsers?.pages; i++) {
    pageSize.push(i);
  }

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col__10" id="dashboard_body">
            <TopBar />
            <HeaderPart />
            <div className="ds_body">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-between mb-5 breadcrumbPart">
                  <div>
                    <h3>Dashboard</h3>
                  </div>
                </div>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <form className="d-flex formStyle">
                      <div>
                        <input
                          type="text"
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
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

                    <Link to={"/user/create"} className="myButton">
                      <BsPlus style={{ fontSize: "23px" }} /> Create
                    </Link>

                    {allUsers?.users ? (
                      <CSVLink data={allUsers?.users} className="btn btn-info">
                        CSV
                      </CSVLink>
                    ) : (
                      "Loading.. ."
                    )}
                  </div>

                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody style={{ borderTop: 0 }}>
                      {allUsers
                        ? allUsers?.users?.map((user) => {
                            return (
                              <tr key={user.id}>
                                <td className="text-capitalize">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                  <Link
                                    to={`/user/${user?._id}/edit`}
                                    className="me-1 adminBtnButton"
                                  >
                                    <BsPencil className="pencilButton" />
                                  </Link>

                                  <button
                                    className="adminBtnButton"
                                    type="button"
                                    onClick={() => handleDelete(user._id)}
                                  >
                                    <BsTrash className="trashButton" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        : "Loading"}
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

export default Users;
