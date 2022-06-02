import React, { useEffect } from 'react';
import { AiFillBank, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsBriefcase, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../Asset/default.png';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { detailsAdmin } from '../../redux/Actions/adminActions';
import { ADMIN_UPDATE_RESET } from '../../redux/Constants/adminConstant';

const Profile = () => {
  const dispatch = useDispatch();
  // redux store call
  const adminSigninData = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSigninData;
  const adminDetailsData = useSelector((state) => state.adminDetails);
  const { adminDetails } = adminDetailsData;
  const adminUpdateData = useSelector((state) => state.adminUpdate);
  const { success } = adminUpdateData;

  useEffect(() => {
    dispatch(detailsAdmin(adminInfo._id));
    // admin profile update
    if (success) {
      dispatch({ type: ADMIN_UPDATE_RESET });
    }
  }, [dispatch, success, adminInfo]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>
            <div className="ds_body h-100 w-100">
              <Breadcrumb title="Profile" url="/profile"></Breadcrumb>
              {/* product upload form */}
              <div className="row justify-content-center">
                <div className="col-8 bg-white rounded-3 shadow-lg p-4">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={
                          adminDetails?.image
                            ? adminDetails?.image?.data?.url
                            : defaultImage
                        }
                        alt="user file"
                      />
                      <div className="ms-3">
                        <h4
                          style={{ opacity: "0.8" }}
                          className="boldh4 mb-1 text-capitalize"
                        >
                          {adminDetails?.firstName +
                            " " +
                            adminDetails?.lastName}
                        </h4>
                        <h6 className="text-secondary">
                          {adminDetails?.role}
                        </h6>
                      </div>
                    </div>

                    <div>
                      <Link
                        to={`/edit/${adminDetails?._id}/profile`}
                        className="myButton"
                      >
                        <BsPencilSquare className="me-1" /> Edit
                      </Link>
                    </div>
                  </div>

                  <div className="row mt-4">
                    {/* mail */}
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <AiOutlineMail style={{ fontSize: "25px" }} />
                        <div className="ms-3">
                          <p>
                            <strong>Mail</strong>
                          </p>
                          <p className="text-secondary">
                            {adminDetails?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* phone */}
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <AiOutlinePhone style={{ fontSize: "25px" }} />
                        <div className="ms-3">
                          <p>
                            <strong>Phone</strong>
                          </p>
                          <p className="text-secondary">
                            {adminDetails?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {/* address */}
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <AiFillBank style={{ fontSize: "25px" }} />
                        <div className="ms-3">
                          <p>
                            <strong>Adresss</strong>
                          </p>
                          <p className="text-secondary">
                            {adminDetails?.address
                              ? adminDetails?.address
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* job designation */}
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <BsBriefcase style={{ fontSize: "25px" }} />
                        <div className="ms-3">
                          <p>
                            <strong>Job Designation / Position</strong>
                          </p>
                          <p className="text-secondary text-capitalize">
                            {adminDetails?.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;