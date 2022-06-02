import { Card } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosCloudUpload } from "react-icons/io";
import defaultImage from "../../../Asset/default.png";
import Loading from "../../../Component/Loading/Loading";

const NidBackImg = ({
  loadingUpload,
  progress,
  nidImgBackPart,
  uploadFileHandler,
  setNidImgBackPart,
  fileName,
}) => {
  const deleteIconHandler = async (data) => {
    if (window.confirm("Are you sure to delete?")) {
      await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setNidImgBackPart("");
    }
  };

  return (
    <div className="w-50">
      {loadingUpload ? (
        <Loading />
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <input
              id="nidFrontImg"
              type="text"
              placeholder="Enter image"
              value={nidImgBackPart?.data?.url || ""}
              onChange={(e) => setNidImgBackPart(e.target.value)}
              className="mb-3 p-2 d-none"
            />
            {nidImgBackPart?.data?.url ? (
              <Alert severity="success">Image uploaded successfully</Alert>
            ) : (
              <Alert severity="warning">Image Not Uploaded Yet</Alert>
            )}
          </div>
        </div>
      )}

      <div className="d-flex align-items-center">
        <div className="my-3 p-2 d-flex flex-column align-items-center justify-content-center">
          <div>
            <label className="form-label">NID back-part Image</label>
          </div>
          <div className="imageData me-3 d-flex flex-column align-items-center">
            <div className="imageInput" style={{ marginRight: "0" }}>
              <input
                name="displayImage"
                className="form-control"
                type="file"
                onChange={(e) => uploadFileHandler(e)}
              />
              <IoIosCloudUpload className="imageUploadIcon" />
            </div>
            <div className="progress mt-3" style={{ width: "100%" }}>
              <div
                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card className="m-2 p-1 imageUpload">
            <img
              src={
                nidImgBackPart?.data?.url
                  ? nidImgBackPart?.data?.url
                  : defaultImage
              }
              className="w-100 h-100"
              width="100"
              alt="Entrepreneur"
            />

            <button
              type="button"
              onClick={() => deleteIconHandler(nidImgBackPart.data)}
              className="imageDelete"
            >
              <BsFillTrashFill />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NidBackImg;
