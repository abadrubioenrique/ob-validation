import React, { useState } from 'react';
  import { FilePond } from 'react-filepond';
  import 'filepond/dist/filepond.min.css';



 export const FilepondComponent = (props) => {
    const [files, setFiles] = useState([]);
    const API_URL = "https://obvalid4.herokuapp.com";
   return (
     <div className="">
      <h1>Validación del Usuario</h1>
      <p className="center">Realice una fotografía de cada cara del dni</p>
      <h1>Front</h1>
      <FilePond
        files={files}
        allowMultiple={false}
        maxFiles={1}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        server={API_URL + "/api/cloudinary/uploadfront"}
      />
    </div>

   )
 }
