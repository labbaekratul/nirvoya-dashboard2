import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import parse from 'html-react-parser';
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from 'react';
import { BsReply } from 'react-icons/bs';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { adminSupportTickets, detailsSupportTickets } from '../../redux/Actions/supportTicketActions';
import { SUPPORT_TICKETS_ADMIN_RESET } from '../../redux/Constants/supportTicketConstants';
import styles from "../Chats/Chats.module.css";

// Jodit Editor
export const config = {
  readonly: false,
  toolbar: true,
  height: 400,
  uploader: {
    insertImageAsBase64URI: true,
  },
};

const SupportReply = () => {
  const dispatch = useDispatch();
  const { supportId } = useParams();
  const editor = useRef(null);

  // redux store call
  const getsupportTicketDetails = useSelector(
    (state) => state.supportTicketDetails
  );
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  const { supportTicketDetails } = getsupportTicketDetails;
  const adminTicket = useSelector((state) => state.adminTicket);
  const { success } = adminTicket;
  
  const imageLightBox = supportTicketDetails?.image?.map((data) => data.url);

  // react hook call
  const [description, setDescription] = useState("");
  const [singleTicketId, setSingleTicketId] = useState("");
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [replayIsOpen, setReplayIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get support id
  const handleClick = (id) => {
    setSingleTicketId(id);
    setReplayIsOpen(true);
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      setErrorMessage("Description is required!");
    } else {
      dispatch(
        adminSupportTickets({
          id: singleTicketId,
          adminName: adminInfo?.firstName,
          adminImage: adminInfo?.image?.data?.url,
          adminComment: description,
        })
      );
    }
  };

  // support ticket reset
  useEffect(() => {
    dispatch(detailsSupportTickets(supportId));
    if (success) {
      setDescription("");
      setSingleTicketId("");
      setErrorMessage("");
      setReplayIsOpen(false);
      dispatch({ type: SUPPORT_TICKETS_ADMIN_RESET });
    }
  }, [dispatch, supportId, success]);

  // handle image click show
  const handleImageClickShow = (data) => {
    setPhotoIndex(data);
    setIsOpen(true);
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
                  title="Support Reply"
                  url="/supports"
                ></Breadcrumb>

                <div className="col-md-12">
                  {supportTicketDetails ? (
                    <div className="row">
                      <div className="col-12">
                        <h4 className="text-white boldh4">
                          Reply Ticket - {supportTicketDetails._id}
                        </h4>
                      </div>

                      <div className="col-8">
                        {supportTicketDetails?.descriptions?.map(
                          (data, index) => (
                            <div className="bg-white rounded-3 shadow-lg p-4 my-3" key={index}>
                              {index === 0 ? (
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5 className="boldh5">
                                      {supportTicketDetails.subject} (
                                      {new Date(
                                        supportTicketDetails.updatedAt
                                      ).toDateString()}
                                      )
                                    </h5>
                                    <span>{data?.userName}</span>
                                  </div>

                                  <div>
                                    <p className="mb-1">
                                      Status:{" "}
                                      <span className="bgDanger rounded-2 text-white py-1 px-2">
                                        {supportTicketDetails.status}
                                      </span>
                                    </p>
                                    <p>
                                      Priority:{" "}
                                      <span className="bgInfo text-white rounded-2 py-1 px-2">
                                        {supportTicketDetails.priority}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex">
                                    <h5 className="boldh5 me-1">
                                      {supportTicketDetails.priority}
                                    </h5>
                                    <span>
                                      (
                                      {new Date(
                                        supportTicketDetails.createdAt
                                      ).toDateString()}
                                      )
                                    </span>
                                  </div>
                                </div>
                              )}

                              <hr />
                              <p>
                                <b>User</b> : {data?.userComment}
                                <br />
                                <AvatarGroup max={4}>
                                  {supportTicketDetails?.image?.map(
                                    (data, index) => (
                                      <Avatar
                                        alt={index}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleImageClickShow(index)
                                        }
                                        src={data.url}
                                      />
                                    )
                                  )}
                                </AvatarGroup>
                              </p>
                              <div className="d-flex my-3">
                                <b>Admin</b> :
                                {parse(data?.adminComment)}
                              </div>
                              <div className="mt-3 text-end">
                                <button
                                  onClick={() => handleClick(data._id)}
                                  className={`${styles.replyBtn}`}
                                >
                                  <BsReply className="BsPencil" />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                        {/* image light box & image modal show done */}
                        {isOpen && (
                          <Lightbox
                            mainSrc={imageLightBox[photoIndex]}
                            nextSrc={
                              imageLightBox[
                                (photoIndex + 1) % imageLightBox.length
                              ]
                            }
                            prevSrc={
                              imageLightBox[
                                (photoIndex + imageLightBox.length - 1) %
                                  imageLightBox.length
                              ]
                            }
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                              setPhotoIndex(
                                (photoIndex + imageLightBox.length - 1) %
                                  imageLightBox.length
                              )
                            }
                            onMoveNextRequest={() =>
                              setPhotoIndex(
                                (photoIndex + 1) % imageLightBox.length
                              )
                            }
                          />
                        )}
                      </div>

                      {replayIsOpen && (
                        <div className="col-4 mt-3">
                          <div className="bg-white rounded-3 shadow-lg p-3">
                            <div>
                              <h5 className="boldh5">Add Reply</h5>
                              <hr />
                            </div>

                            <form
                              className="formStyle px-2"
                              onSubmit={handleSubmit}
                            >
                              <div className="form-group">
                                <p>Ticket ID : {singleTicketId}</p>

                                <label htmlFor="description" className="mb-2">
                                  Description
                                </label>
                                <JoditEditor
                                  ref={editor}
                                  value={description}
                                  config={config}
                                  onBlur={(data) => setDescription(data)}
                                  onChange={(newContent) => {}}
                                />
                                {!description && (
                                  <span className="text-danger">
                                    {errorMessage}
                                  </span>
                                )}
                              </div>

                              <div className="text-end mt-2">
                                <button type="submit" className="btnButton">
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "locading..."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportReply;