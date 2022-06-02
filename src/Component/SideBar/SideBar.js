import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight, FaRegCircle } from "react-icons/fa";
import {
  FcBusinessman,
  FcCustomerSupport,
  FcFlowChart,
  FcFolder,
  FcGlobe,
  FcHeatMap,
  FcHome,
  FcList,
  FcNews,
  FcPicture,
  FcPodiumWithSpeaker,
  FcPortraitMode,
  FcRuler,
  FcUpLeft,
} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";
import defaultImage from "../../Asset/default.png";
import logo from "../../Asset/Oikko-White.png";
import { adminSignout, detailsAdmin } from "../../redux/Actions/adminActions";
import styles from "./SideBar.module.css";

// side bar active button
function MenuLink({ label, icon, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li className={`nav-item ${match ? styles.active_color : " "}`}>
      <Link className={`${styles.nav_link} color nav-link`} to={to}>
        {icon} {label}
      </Link>
    </li>
  );
}

function DropDown({ label, icon, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li
      className={`nav-item ${styles.menuList} ${
        match ? styles.active_color : " "
      }`}
      style={{ padding: "0 3.5rem" }}
    >
      <Link className={`${styles.dropDown_nav_link} color nav-link`} to={to}>
        {icon} {label}
      </Link>
    </li>
  );
}

const SideBar = () => {
  let match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const matchUrl = match.url;

  // admin logout
  const adminSignOutHandler = () => {
    dispatch(adminSignout());
    history.push("/login");
  };

  const adminSigninData = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSigninData;
  const adminDetailsData = useSelector((state) => state.adminDetails);
  const { adminDetails } = adminDetailsData;

  // react hook
  const [dropDownShow, setDropDownShow] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(detailsAdmin(adminInfo?._id));
  }, [dispatch, adminInfo]);

  const handleDropDown = (data) => {
    setDropDownShow(data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (
      matchUrl === "/admin/categories" ||
      matchUrl === "/admin/feature/categories"
    ) {
      setDropDownShow("category");
      setIsOpen(!isOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.sideBarShadow} col__2`}>
      <div className={`${styles.positionFixed}`}>
        {/* logo */}
        <div className={`${styles.SideBarLogo}`}>
          <Link to="/">
            <img className="my-4" src={logo} alt="logo" />
          </Link>
        </div>

        {/* admin user */}
        <div className={`${styles.adminUser}`}>
          {adminDetails ? (
            <>
              <img
                src={
                  adminDetails?.image
                    ? adminDetails?.image?.data?.url
                    : defaultImage
                }
                alt=""
              />
              <h5 style={{ opacity: "0.8" }} className="boldh5 text-capitalize">
                {adminDetails?.firstName + " " + adminDetails?.lastName}
              </h5>
              <p className="text-secondary">{adminDetails?.role}</p>
            </>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </div>

        {/* menu link */}
        <div className={`${styles.navLink}`}>
          <ul className={`${styles.nav} nav flex-column`}>
            <MenuLink
              activeOnlyWhenExact={true}
              to="/"
              label="Home"
              icon={<FcHome />}
            />

            <MenuLink to="/users" label="Users" icon={<FcBusinessman />} />

            <MenuLink to="/orders" label="Orders" icon={<FcList />} />

            <MenuLink to="/products" label="Products" icon={<FcFolder />} />

            {/* dropdown */}
            <li className={`nav-item ${styles.dropDownList}`}>
              <div
                onClick={() => handleDropDown("category")}
                className="d-flex align-items-center justify-content-between"
                style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                <button
                  type="button"
                  style={{
                    border: "none",
                    fontSize: "18px",
                    fontWeight: 600,
                    padding: "0 1.5rem",
                  }}
                >
                  <FcFlowChart /> Categories
                </button>
                <div>
                  {dropDownShow === "category" && isOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                </div>
              </div>
            </li>

            {dropDownShow === "category" && isOpen && (
              <ul className="navbar-nav">
                <DropDown
                  to="/categories"
                  label="Categories"
                  icon={<FaRegCircle className={styles.FaRegCircle} />}
                />
                <DropDown
                  to="/feature/categories"
                  label="Feature Category"
                  icon={<FaRegCircle className={styles.FaRegCircle} />}
                />
              </ul>
            )}

            <MenuLink to="/colors" label="Colors" icon={<FcHeatMap />} />
            <MenuLink to="/sizes" label="Sizes" icon={<FcRuler />} />
            <MenuLink to="/blogs" label="Blogs" icon={<FcNews />} />

            <MenuLink
              to="/entrepreneurs"
              label="Entrepreneurs"
              icon={<FcPortraitMode />}
            />
            <MenuLink to="/banners" label="Banners" icon={<FcPicture />} />
            <MenuLink
              to="/admins"
              label="Admins"
              icon={<FcPodiumWithSpeaker />}
            />
            {/* <MenuLink to="/chats" label="Chats" icon={<FcComments />} /> */}
            <MenuLink
              to="/supports"
              label="Supports"
              icon={<FcCustomerSupport />}
            />
            <li className="nav-item">
              <Link
                className={`${styles.nav_link} color nav-link`}
                to="/"
                target="_blank"
              >
                <FcGlobe /> Go To Website
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={adminSignOutHandler}
                className={`${styles.nav_link} color nav-link`}
                to="#"
              >
                <FcUpLeft /> LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
