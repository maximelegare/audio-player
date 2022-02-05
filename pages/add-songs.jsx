import React from "react";
import axios from "axios"
export default function AddMusic() {
  const handleChangeFiles = async (e) => {
    const formData = new FormData();

    for (const file of e.target.files) {
      formData.append("files", file);
    }

    // Post to backend with formData containing the files


    
    fetch("http://localhost:3000/api/add-songs", {
      method:"POST",
      body:formData

    }).catch((err) => {
      console.log(err)
    })

  };

  return (
    <div>
      <div>
        <input type="file" multiple onChange={handleChangeFiles} />
        <button>upload</button>
      </div>
      <div className="fileList">
      </div>
    </div>
  );
}
