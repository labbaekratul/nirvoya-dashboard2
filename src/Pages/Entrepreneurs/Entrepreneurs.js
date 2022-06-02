/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { deleteEntrepreneurs, getEntrepreneurs } from '../../redux/Actions/entrepreneursActions';
import { ENTREPRENEURS_CREATE_RESET, ENTREPRENEURS_DELETE_RESET, ENTREPRENEURS_UPDATE_RESET } from '../../redux/Constants/entrepreneursConstants';

const Entrepreneurs = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const allEntrepreneurs = useSelector((state) => state.entrepreneurs);
  const { entrepreneurs } = allEntrepreneurs;
  
  const entrepreneurCreate = useSelector((state) => state.entrepreneursCreate);
  const { success: successCreate } = entrepreneurCreate;

  const entrepreneurUpdate = useSelector((state) => state.entrepreneursUpdate);
  const { success: successUpdate } = entrepreneurUpdate;
  
  const entrepreneurDelete = useSelector((state) => state.entrepreneursDelete);
  const { success: successDelete } = entrepreneurDelete;

  // react hook
  const [pageNumber, setPageNumber] = useState(1);
  const [showTotalPagination,setShowTotalPagination] = useState({ start: 0, end: 3 });

  // all api call
  useEffect(() => {
    // all entrepreneurs
    dispatch(getEntrepreneurs({ pageNumber: data, pageSize: 10 }));

    // create
    if (successCreate) {
      dispatch({
        type: ENTREPRENEURS_CREATE_RESET,
      });
    }
    // update
    if (successUpdate) {
      dispatch({
        type: ENTREPRENEURS_UPDATE_RESET,
      });
    }

    if (successDelete) {
      dispatch({
        type: ENTREPRENEURS_DELETE_RESET,
      });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  let pageSize = [];

  for (let i = 1; i <= entrepreneurs?.pages; i++) {
    pageSize.push(i);
  }

  const data = useMemo(
    () =>
      entrepreneurs?.entrepreneur?.map((data) => ({
        id: data._id,
        name: data.name,
        image: data?.image?.data,
      })),
    [entrepreneurs]
  );

  // delete
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteEntrepreneurs(product));
    }
  };
  
  // pagination
  const handlePagination = (data) => {
    dispatch(getEntrepreneurs({ pageNumber: data, pageSize: 10 }));
    setPageNumber(data);
    setShowTotalPagination({ start: data - 1, end: data + 2 });
  }

  // search button
  const handleSearchButton = () => {
    // code
  }

  // clear button
  const handleClearButton = () => {
    // code
    handlePagination(1);
  }
  
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
                  title="Entrepreneurs"
                  url="/entrepreneur/create"
                ></Breadcrumb>
                {/* table of content */}
                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                <div className="d-flex justify-content-between mb-4">
                    <form className="d-flex formStyle">
                      <div>
                        <input type="text" style={{ width: 300 }} className="form-control" placeholder="Search..." />
                      </div>
                      <button onClick={handleSearchButton} type="button" className="searchButton">Search</button>
                      <button onClick={handleClearButton} type="button" className="searchButton">Clear</button>
                    </form>

                    <Link to={'/entrepreneur/create'} className="myButton">
                      <BsPlus style={{ fontSize: "23px" }} /> Create
                    </Link>
                  </div>

                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    
                    <tbody style={{ borderTop: 0 }}>
                      {
                        entrepreneurs?.entrepreneur?.map((entrepreneur) => {
                          return (
                            <tr>
                              <th>
                                <div style={{ width: "70px", height: "70px" }}>
                                  <img
                                    style={{ borderRadius: "5px", width: "100%", height: "100%" }}
                                    className="shadow-sm"
                                    src={entrepreneur?.image?.data?.url}
                                    width={60}
                                    alt="Image"
                                  />
                                </div>
                              </th>
                              <td>{entrepreneur.name}</td>
                              <td>
                                <Link
                                  to={`/entrepreneur/${entrepreneur._id}/edit`}
                                  className="me-1 adminBtnButton"
                                >
                                  <BsPencil className="pencilButton" />
                                </Link>

                                <button className="adminBtnButton" type="button" onClick={() => deleteHandler(entrepreneur._id)}>
                                  <BsTrash className="trashButton" />
                                </button>
                              </td>
                            </tr>
                          )
                        })  
                      }
                    </tbody>
                  </table>

                  <nav className='d-flex justify-content-end'>
                    <ul className="pagination">
                      {
                        // disabled
                        pageNumber === 1 ? (
                        <li className={`page-item disabled`}>
                          <Link className="page-link" to="#">Previous</Link>
                        </li>
                      ) : (
                        <li onClick={() => handlePagination(1)} className={`page-item`}>
                          <Link className="page-link" to="#">Previous</Link>
                        </li>
                      )}
                      
                      {
                        pageSize.slice(showTotalPagination.start,showTotalPagination.end).map((index) => {
                          return (
                            <li onClick={() => handlePagination(index)} className={`page-item ${index === pageNumber ? "active" : " "}`}>
                              <Link className="page-link" to="#">{index}</Link>
                            </li>
                          )
                        })
                      }
                      
                      {
                        pageSize?.length === pageNumber ? (
                          <li className="page-item disabled">
                            <Link className={`page-link`} to="#">Next</Link>
                          </li>
                        ) : (
                          <li className="page-item">
                            <Link className={`page-link`} onClick={() => handlePagination(pageSize.length)} to="#">Next</Link>
                          </li>
                        )
                      }
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

export default Entrepreneurs;