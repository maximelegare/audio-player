import React from "react";

import styles from "../../styles/_Core/FileInput.module.scss";

import { AiOutlineCloudUpload } from "react-icons/ai";

const FileInput = ({ children }) => {
  const handleChangeFiles = async (e) => {
    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("files", file);
    }

    // Post to backend with formData containing the files
    fetch("http://localhost:3000/api/add-songs", {
      method: "POST",
      body: formData,
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={styles.fileInputContainer}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <AiOutlineCloudUpload />
        </div>
        <div className={styles.text}>Upload Songs</div>
      </div>
      <input
        className={styles.fileInput}
        type="file"
        multiple
        onChange={handleChangeFiles}
      />
    </div>
  );
};

export default FileInput;
