/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, url }) => {
  
  return (
    <div className="row">
      <div className="col-md-12 d-flex align-items-center justify-content-between mb-5 breadcrumbPart">
        <div>
          <h3>{title}</h3>
        </div>

        <nav>
          <ol className="breadcrumb d-flex">
            <p>You are here : &nbsp;</p>
            <li className="breadcrumb-item">
              <Link className="LinkColor" to="/">
                Dashboard
              </Link>
            </li>
            
            {!url.split("/")[2] && (
              <li className="breadcrumb-item">
                <Link className="LinkColor" to={url}>
                  {title.split(" ")[0] === "Category" ? title.split(" ")[0] : title.split(" ")[0] + "s"}
                </Link>
              </li>
            )}

            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
