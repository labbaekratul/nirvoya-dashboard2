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
import { addColors, colorDetail, deleteColor } from '../../redux/Actions/colorActions';
import { COLOR_CREATE_RESET, COLOR_DELETE_RESET, COLOR_UPDATE_RESET } from '../../redux/Constants/colorConstants';

const Colors = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // redux store
  const getColor = useSelector((state) => state.colors);
  const { colors } = getColor;
  const colorCreate = useSelector((state) => state.colorCreate);
  const { success: successCreate } = colorCreate;
  const colorUpdate = useSelector((state) => state.colorUpdate);
  const { success: successUpdate } = colorUpdate;
  const colortDelete = useSelector((state) => state.colorDelete);
  const { success: successDelete } = colortDelete;

  //  single delete
  const deleteHandler = (colorId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteColor(colorId));
    }
  };

  const editHandler = (editId) => {
    if (editId) {
      dispatch(colorDetail(editId));
      history.push(`/color/${editId}/edit`);
    }
  };

  // multiple delete
  const handleDeleteClick = (colorId) => {
    if (window.confirm("Are you sure to delete?")) {
      colorId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteColor(deleteId));
      });
    }
  };

  useEffect(() => {
    dispatch(addColors());

    if (successCreate) {
      dispatch({ type: COLOR_CREATE_RESET });
    }

    if (successUpdate) {
      dispatch({ type: COLOR_UPDATE_RESET });
    }

    if (successDelete) {
      dispatch({ type: COLOR_DELETE_RESET });
    }
  }, [dispatch, successDelete, successCreate, successUpdate]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Color Code",
        accessor: "colorCode",
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
                onClick={() => editHandler(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button type="button" onClick={() => deleteHandler(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [deleteHandler, editHandler]
  );

  const data = useMemo(
    () =>
      colors?.map((data) => ({
        id: data._id,
        name: data.name,
        colorCode: data.colorCode,
        orderBy: data.orderBy,
        status: data.status ? "Yes" : "No",
      })),
    [colors]
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
                <Breadcrumb
                  title="Colors"
                  url="/color/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/color/create"}
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

export default Colors;