import { Card } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosCloudUpload } from "react-icons/io";
import defaultImage from "../../../Asset/default.png";

const ImgUplHandler = ({
  progress,
  image,
  uploadFileHandler,
  setImage,
  fileName,
}) => {
  const deleteIconHandler = async (data) => {
    if (window.confirm("Are you sure to delete?")) {
      await Axios.post("https://nirvoya.herokuapp.com/api/uploads/delete", {
        Bucket: data.bucketName,
        Key: data.key,
      });
      setImage("");
    }
  };

  return (
    <div className="w-50">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <input
            id="image"
            type="text"
            placeholder="Enter image"
            value={image?.data?.url || ""}
            onChange={(e) => setImage(e.target.value)}
            className="mb-3 p-2 d-none"
          />
          {image?.data?.url ? (
            <Alert severity="success">Image uploaded successfully</Alert>
          ) : (
            <Alert severity="warning">Image Not Uploaded Yet</Alert>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center">
        <div className="my-3 p-2 me-3 d-flex flex-column align-items-center">
          <label className="form-label">
            Entrepreneur Image <span className="text-danger fs-5"> *</span>
          </label>
          <div className="imageData d-flex flex-column align-items-center">
            <div className="imageInput" style={{ marginRight: "0" }}>
              <input
                name="displayImage"
                className="form-control"
                type="file"
                onChange={(e) => uploadFileHandler(e, fileName)}
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

        <Card className="m-2 p-1 imageUpload">
          <img
            className="h-100 w-100"
            src={image?.data?.url ? image?.data?.url : defaultImage}
            width="100"
            alt="Entrepreneur"
          />

          <button
            type="button"
            onClick={() => deleteIconHandler(image.data)}
            className="imageDelete"
          >
            <BsFillTrashFill />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default ImgUplHandler;
