import React, { useEffect,useState } from 'react';
import { FilePond } from 'react-filepond';
import axios from 'axios';
import { getToken } from '../../utils/helpers/auth-helpers';

//Styles
import 'filepond/dist/filepond.min.css';
import './validation.scss'

 export const FilepondComponent = (props) => { 
    const API_URL = 'https://obvalid4.herokuapp.com';
    const [usuario,setUsuario]= useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const token = getToken();
    useEffect(() => {
        async function cargarUsuario(){
            if(!getToken()){
                setCargandoUsuario(false);
                return;
            }
            try{
                const {data: usuario} = await axios.get(API_URL + '/api/whoami');
                setUsuario(usuario);
                setCargandoUsuario(false);
            }catch(error){
                
            }
    }
        cargarUsuario();
       
    }, );
   return (
     <div >
      <h1>Validación del Usuario</h1>

      
        {(usuario!=null) && (usuario.validated) && (cargandoUsuario===false) ? 
        
        (
            <div>
            
            <h3 className="center"><i class="bi bi-check-circle-fill validado"/>Ha sido Validado</h3>
            </div>
            )
        : 
        ( 
        <div>
        
        <div>
            <h3 className="center"><i class="bi bi-x-circle-fill no-validado"/>No ha sido Validado</h3>
            </div>
        <p className="center">Por favor suba una fotografía de cada cara del dni</p>
        <h1>DNI - Cara frontal</h1>
        <div className="subida">  
        <FilePond
        name="dni-front"
        required={true}
        allowMultiple={false}
        maxFiles={1}      
        maxTotalFileSize={1048576}
        labelMaxTotalFileSize={"Total file size should be lesser than 1MB."}
        server={
        {
            timeout: 99999,
            process: (fieldName, file, metadata, load, error, progress, abort) => {

                const formData = new FormData()
                formData.append('multipartFile', file, file.name)

                // aborting the request
                const CancelToken = axios.CancelToken
                const source = CancelToken.source()
                axios({
                    method: 'POST',
                    url: API_URL + "/api/cloudinary/uploadfront",
                    data: formData,
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Basic ${token}` 
                    },
                    //cancelToken: source.token,
                    onUploadProgress: (e) => {
                        // updating progress indicator
                        progress(e.lengthComputable, e.loaded, e.total)
                    }
                }).then(response => {
                    // passing the file id to FilePond
                    load(response.file)
                }).catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        console.log('Request canceled', thrown.message)
                    } else {
                        // handle error
                    }
                })
                // Setup abort interface
                return {
                    abort: () => {
                        source.cancel('Operation canceled by the user.')
                        abort()
                    }
                }
            }

        }
    }
    />
</div>
    <h1>DNI - Cara trasera</h1>
    <div className="subida">
        <FilePond
        name="dni-back"
        required={true}
        allowMultiple={false}
        maxFiles={1}      
        server={
        {
            timeout: 99999,
            process: (fieldName, file, metadata, load, error, progress, abort) => {

                const formData = new FormData()
                formData.append('multipartFile', file, file.name)

                // aborting the request
                const CancelToken = axios.CancelToken
                const source = CancelToken.source()
                axios({
                    method: 'POST',
                    url: API_URL + "/api/cloudinary/uploadback",
                    data: formData,
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Basic ${token}` 
                    },
                    //cancelToken: source.token,
                    onUploadProgress: (e) => {
                        // updating progress indicator
                        progress(e.lengthComputable, e.loaded, e.total)
                    }
                }).then(response => {
                    // passing the file id to FilePond
                    load(response.file)
                }).catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        console.log('Request canceled', thrown.message)
                    } else {
                        // handle error
                    }
                })
                // Setup abort interface
                return {
                    abort: () => {
                        source.cancel('Operation canceled by the user.')
                        abort()
                    }
                }
            }

        }
    }
    />
    </div>
            </div>

            )}
    </div>

   )
 }
