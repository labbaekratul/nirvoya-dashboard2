/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import { deleteBlog, getBlogs } from "../../redux/Actions/blogActions";
import {
  BLOG_CREATE_RESET,
  BLOG_DELETE_RESET,
  BLOG_UPDATE_RESET,
} from "../../redux/Constants/blogConstants";

const Blogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store get data
  const allBlogData = useSelector((state) => state.blogs);
  const { blogs } = allBlogData;
  const blogCreate = useSelector((state) => state.blogCreate);
  const { success: successCreate } = blogCreate;
  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { success: successUpdate } = blogUpdate;
  const blogDelete = useSelector((state) => state.blogDelete);
  const { success: successDelete } = blogDelete;

  // react hook
  const [pageNumber, setPageNumber] = useState(1);
  const [showTotalPagination, setShowTotalPagination] = useState({
    start: 0,
    end: 3,
  });

  // blog get action data
  useEffect(() => {
    dispatch(getBlogs({ pageNumber: data, pageSize: 10 }));

    if (successCreate) {
      dispatch({ type: BLOG_CREATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: BLOG_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  const data = useMemo(
    () =>
      blogs?.blogs?.map((data) => ({
        id: data._id,
        image: data?.image,
        title: data.title,
        category: data.category,
        blogWritter: data.blogWritter.name,
        status: data.status ? "Yes" : "No",
        featured: data.featured ? "Yes" : "No",
      })),
    [blogs]
  );

  let pageSize = [];

  for (let i = 1; i <= blogs?.pages; i++) {
    pageSize.push(i);
  }

  // delete
  const deleteHandler = (blogId, image) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteBlog(blogId));
      image.map((img) =>
        Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
          Bucket: img.bucketName,
          Key: img.key,
        })
      );
    }
  };

  // pagination
  const handlePagination = (data) => {
    dispatch(getBlogs({ pageNumber: data, pageSize: 10 }));
    setPageNumber(data);
    setShowTotalPagination({ start: data - 1, end: data + 2 });
  };

  // search button
  const handleSearchButton = () => {
    // code
  };

  // clear button
  const handleClearButton = () => {
    handlePagination(1);
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
                <Breadcrumb
                  title="Blog List"
                  url="/admin/blog/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <form className="d-flex formStyle">
                      <div>
                        <input
                          type="text"
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

                    <Link to={"/blog/create"} className="myButton">
                      <BsPlus style={{ fontSize: "23px" }} /> Create
                    </Link>
                  </div>

                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Featured</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody style={{ borderTop: 0 }}>
                      {blogs?.blog?.map((blog) => {
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
                                  src={blog?.image[0]?.url}
                                  width={60}
                                  alt="Image"
                                />
                              </div>
                            </th>

                            <td>{blog.title}</td>
                            <td>{blog.category}</td>
                            <td>{blog.status ? "Yes" : "No"}</td>
                            <td>{blog.featured ? "Yes" : "No"}</td>
                            <td>
                              <Link
                                to={`/blog/${blog._id}/edit`}
                                className="me-1 adminBtnButton"
                              >
                                <BsPencil className="pencilButton" />
                              </Link>

                              <button
                                className="adminBtnButton"
                                type="button"
                                onClick={() =>
                                  deleteHandler(blog._id, blog.image)
                                }
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

export default Blogs;
