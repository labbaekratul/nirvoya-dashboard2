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
import { deleteAdmin, detailsAdmin, getAdmins } from '../../redux/Actions/adminActions';
import { ADMIN_CREATE_RESET, ADMIN_DELETE_RESET, ADMIN_UPDATE_RESET } from '../../redux/Constants/adminConstant';

const Admins = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store
  const getadmins = useSelector((state) => state.admins);
  const { admins } = getadmins;
  
  const adminCreate = useSelector((state) => state.adminCreate);
  const { success: successCreate } = adminCreate;
  
  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { success: successUpdate } = adminUpdate;
  
  const adminDelete = useSelector((state) => state.adminDelete);
  const { success: successDelete } = adminDelete;

  useEffect(() => {
    // get banner
    dispatch(getAdmins());
    // create banner
    if (successCreate) {
      dispatch({ type: ADMIN_CREATE_RESET });
    }
    // update banner
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_RESET });
    }
    // delete banner
    if (successDelete) {
      dispatch({ type: ADMIN_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // edit Banner
  const handleEdit = (editId) => {
    if (editId) {
      dispatch(detailsAdmin(editId));
      history.push(`/admin/${editId}/edit`);
    }
  };

  // delete Banner handle
  const handleDelete = (deleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteAdmin(deleteId));
    }
  };

  // multiple delete
  const handleDeleteClick = (mltDeleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      mltDeleteId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteAdmin(deleteId));
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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Role",
        accessor: "role",
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
      admins?.map((data) => ({
        id: data._id,
        name: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        role: data.role,
      })),
    [admins]
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
                  title="Admins"
                  url="/admin/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/admin/create"}
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

export default Admins;