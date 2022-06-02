/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { BsReply, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from '../../Component/Loading/Loading';
import SideBar from '../../Component/SideBar/SideBar';
import Styles from '../../Component/Table/Styles';
import Table from '../../Component/Table/Table';
import TopBar from '../../Component/TopBar/TopBar';
import { deleteSupportTickets, detailsSupportTickets, getSupportTickets } from '../../redux/Actions/supportTicketActions';
import { SUPPORT_TICKETS_CREATE_RESET, SUPPORT_TICKETS_DELETE_RESET, SUPPORT_TICKETS_UPDATE_RESET } from '../../redux/Constants/supportTicketConstants';

const Supports = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store
  const allSupportTicket = useSelector((state) => state.supportTickets);
  const { supportTickets } = allSupportTicket;

  const supportTicketCreate = useSelector((state) => state.supportTicketCreate);
  const { success: successCreate } = supportTicketCreate;

  const supportTicketUpdate = useSelector((state) => state.supportTicketUpdate);
  const { success: successUpdate } = supportTicketUpdate;

  const supportTicketDelete = useSelector((state) => state.supportTicketDelete);
  const { success: successDelete } = supportTicketDelete;

  useEffect(() => {
    // get banner
    dispatch(getSupportTickets({ userId: "" }));
    // create banner
    if (successCreate) {
      dispatch({ type: SUPPORT_TICKETS_CREATE_RESET });
    }
    // update banner
    if (successUpdate) {
      dispatch({ type: SUPPORT_TICKETS_UPDATE_RESET });
    }
    // delete banner
    if (successDelete) {
      dispatch({ type: SUPPORT_TICKETS_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // replay details
  const handleReplay = (replayId) => {
    if (replayId) {
      dispatch(detailsSupportTickets(replayId));
      history.push(`/support/${replayId}/reply`);
    }
  };

  // delete replay handle
  const handleDelete = (deleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteSupportTickets(deleteId));
    }
  };

  // multiple delete
  const handleDeleteClick = (mltDeleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      mltDeleteId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteSupportTickets(deleteId));
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Problem Type",
        accessor: "problemType",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "created Date",
        accessor: "createdAt",
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
                onClick={() => handleReplay(rowIdx)}
              >
                <BsReply className="BsPencil" />
              </button>

              <button type="button" onClick={() => handleDelete(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [handleDelete, handleReplay]
  );

  const data = useMemo(
    () =>
      supportTickets?.map((data) => ({
        id: data._id,
        priority: data.priority,
        problemType: data.problemType,
        subject: data.subject,
        status: data.status,
        createdAt:
          new Date(data.createdAt).toDateString() +
          ", " +
          new Date(data.createdAt).toLocaleTimeString(),
      })),
    [supportTickets]
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
                  title="Supports"
                  url="/support/reply"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={""}
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

export default Supports;