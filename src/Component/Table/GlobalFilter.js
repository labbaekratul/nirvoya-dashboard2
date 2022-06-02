import React from "react";
import { CSVLink } from "react-csv";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FcExport } from "react-icons/fc";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  transition: ease 0.2s all;
  border: none !important;
  background: #fe696a !important;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  &:hover {
    color: #fff;
  }
`;

const GlobalFilter = ({
  filter,
  setFilter,
  selectedFlatRows,
  url,
  handleDeleteClick,
  data,
}) => {
  return (
    <div className="mb-3 d-flex justify-content-between align-items-center">
      {/* search... */}
      <form className="d-flex justify-content-between adminSearch">
        <input
          type="search"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
        />
      </form>
      <div className="d-flex">
        <div className="text-end me-2">
          <button className="exportButton">
            <CSVLink
              data={data}
              filename={`${url ? url.split("/")[2] : "fileName"}.csv`}
            >
              <FcExport style={{ fontSize: "18px" }} /> Export
            </CSVLink>
          </button>
        </div>
        {selectedFlatRows.length !== 0 ? (
          <div>
            <Button
              onClick={() => handleDeleteClick(selectedFlatRows)}
              type="button"
            >
              <BsTrash />
            </Button>
          </div>
        ) : (
          <>
            {url !== "" && (
              <div className="text-end">
                <Link to={url} className="myButton">
                  <BsPlus style={{ fontSize: "23px" }} /> Create
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalFilter;
