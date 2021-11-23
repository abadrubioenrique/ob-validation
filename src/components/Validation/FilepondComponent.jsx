import React, { useState } from 'react';
  import { FilePond } from 'react-filepond';
  import 'filepond/dist/filepond.min.css';



 export const FilepondComponent = (props) => {
    const [files, setFiles] = useState([])
   return (
     <div className="">
      <h1>Validación del Usuario</h1>
      <p className="center">Realice una fotografía de cada cara del dni</p>
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={3}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        server="/api"
      />
    </div>

   )
 }
