import React from "react";
import Dropzone from "react-dropzone";

const UploadDropzone = ({ onDrop, multiple }) => {
  return (
    <Dropzone onDrop={onDrop} multiple={multiple}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            style: {
              border: "2px dashed gray",
              padding: "60px",
              borderRadius: "5px",
              cursor: "pointer",
            },
          })}
        >
          <input {...getInputProps()} />
          <p style={{ marginBottom: "0px", textAlign: "center" }}>
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadDropzone;
