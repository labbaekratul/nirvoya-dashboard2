/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from '../../Component/Loading/Loading';
import SideBar from '../../Component/SideBar/SideBar';
import Styles from '../../Component/Table/Styles';
import Table from '../../Component/Table/Table';
import TopBar from '../../Component/TopBar/TopBar';
import { deleteSize, editSize, getSizes } from '../../redux/Actions/sizeActions';
import { SIZE_CREATE_RESET, SIZE_DELETE_RESET, SIZE_UPDATE_RESET } from '../../redux/Constants/sizeConstants';

const Sizes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // all size
  const allSizes = useSelector((state) => state.sizes);
  const { sizes } = allSizes;
  // create size
  const sizeCreate = useSelector((state) => state.sizeCreate);
  const { success: successCreate } = sizeCreate;
  // update size
  const sizeUpdate = useSelector((state) => state.sizeUpdate);
  const { success: successUpdate } = sizeUpdate;
  // delete size
  const sizeDelete = useSelector((state) => state.sizeDelete);
  const { success: successDelete } = sizeDelete;

  // all api call dispatch
  useEffect(() => {
    // all size get
    dispatch(getSizes());
    // create size
    if (successCreate) {
      dispatch({ type: SIZE_CREATE_RESET });
    }
    // update size
    if (successUpdate) {
      dispatch({ type: SIZE_UPDATE_RESET });
    }
    // delete size
    if (successDelete) {
      dispatch({ type: SIZE_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // edit size
  const handleEdit = (editId) => {
    if (editId) {
      dispatch(editSize(editId));
      history.push(`/size/${editId}/edit`);
    }
  };

  // delete size handle
  const handleDelete = (sizeId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteSize(sizeId));
    }
  };

  // multiple delete
  const handleDeleteClick = (sizeId) => {
    if (window.confirm("Are you sure to delete?")) {
      sizeId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteSize(deleteId));
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "OrderBy",
        accessor: "orderBy",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;
          return (
            <div>
              <button
                type="button"
                className="me-1"
                onClick={() => handleEdit(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button type="button" onClick={() => handleDelete(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [handleDelete, handleEdit]
  );

  const data = useMemo(
    () =>
      sizes?.map((data) => ({
        id: data._id,
        name: data.name,
        orderBy: data.orderBy,
        status: data.status ? "Yes" : "No",
      })),
    [sizes]
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
              <Breadcrumb
                title="Sizes"
                url="/size/create"
              ></Breadcrumb>

              {/* table of content */}
              <div className="row">
                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/size/create"}
                          columns={columns}
                          data={data}
                          handleDeleteClick={handleDeleteClick}
                        ></Table>
                      )}
                    </div>
                  </Styles>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sizes;