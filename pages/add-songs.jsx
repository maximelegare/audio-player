import React from "react";
import { useRef } from "react";
import axios from "axios";
export default function AddMusic() {

  const inputRef = useRef(null)

  const handleChangeFiles = async (e) => {
    const formData = new FormData()


    for (const file of inputRef.current.files){
      formData.append("files", file) 
    }

    for (const [key, value] of formData){
      console.log(`key ${key}`)
      console.log(`value ${value}`)
    }

     axios.post("http://localhost:3000/api/add-songs", formData)
  };
  


  return (
    <div>
      <div>
        <input type="file" multiple ref={inputRef}
        onChange={handleChangeFiles} 
        />
        <button >upload</button>
      </div>
      <div className="fileList">
        {/* {
          files?.map((file) => {
            <div>
              {file?.name}
            </div>
          })
        } */}
      </div>
    </div>
  );
}
