/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import React, { useEffect, useMemo } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import Loading from "../../Component/Loading/Loading";
import SideBar from "../../Component/SideBar/SideBar";
import Styles from "../../Component/Table/Styles";
import Table from "../../Component/Table/Table";
import TopBar from "../../Component/TopBar/TopBar";
import {
  bannerDetail,
  deleteBanner,
  GetBanners,
} from "../../redux/Actions/bannerAction";
import {
  BANNER_CREATE_RESET,
  BANNER_DELETE_RESET,
  BANNER_UPDATE_RESET,
} from "../../redux/Constants/bannerConstant";

const Banners = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store
  const getBanners = useSelector((state) => state.banners);
  const { banners } = getBanners;

  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { success: successCreate } = bannerCreate;

  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { success: successUpdate } = bannerUpdate;

  const bannerDelete = useSelector((state) => state.bannerDelete);
  const { success: successDelete } = bannerDelete;

  useEffect(() => {
    // get banner
    dispatch(GetBanners());
    // create banner
    if (successCreate) {
      dispatch({ type: BANNER_CREATE_RESET });
    }
    // update banner
    if (successUpdate) {
      dispatch({ type: BANNER_UPDATE_RESET });
    }
    // delete banner
    if (successDelete) {
      dispatch({ type: BANNER_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // edit Banner
  const handleEdit = (editId) => {
    if (editId) {
      dispatch(bannerDetail(editId));
      history.push(`/banner/${editId}/edit`);
    }
  };

  // delete Banner handle
  const handleDelete = (deleteId, data) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteBanner(deleteId));
      Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
    }
  };

  // multiple delete
  const handleDeleteClick = (mltDeleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      mltDeleteId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteBanner(deleteId));
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: (props) => (
          <img src={props.row.original.image.url} width={150} alt="Image" />
        ),
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "OrderBy",
        accessor: "orderby",
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
          const image = props.row.original.image;

          return (
            <div>
              <button
                type="button"
                className="me-1"
                onClick={() => handleEdit(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button type="button" onClick={() => handleDelete(rowIdx, image)}>
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
      banners?.map((data) => ({
        id: data._id,
        title: data.title,
        url: data.url,
        image: data.image.data,
        orderby: data.orderby,
        status: data.status,
      })),
    [banners]
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
                <Breadcrumb title="Blogs" url="/blog/create"></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/banner/create"}
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

export default Banners;
