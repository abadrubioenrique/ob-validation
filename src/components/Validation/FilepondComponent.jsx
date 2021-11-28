import React, { useEffect,useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { getToken } from '../../utils/helpers/auth-helpers';



 export const FilepondComponent = (props) => {
    const [files, setFiles] = useState([]);
    
    const API_URL = 'https://obvalid4.herokuapp.com';
    const [usuario,setUsuario]= useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [logged, setLogged]= useState(false);
    const [validado, setValidado] = useState();
    const token = getToken();
    useEffect(() => {
        async function cargarUsuario(){
            if(!getToken()){
                setCargandoUsuario(false);
                console.log("No hay token")
                return;
            }
            try{
                const {data: usuario} = await axios.get(API_URL + '/api/whoami');
                setUsuario(usuario);
                console.log(JSON.stringify(usuario));
                setLogged(true);
                setCargandoUsuario(false);
            }catch(error){
                console.log(error);
            }
    }
        cargarUsuario();
       
    }, []);
   return (
     <div className="">
      <h1>Validación del Usuario</h1>

      
        {usuario!=null && usuario.validated ? (<h3 className="center">Ha sido Validado</h3>): (
            
            
        <div>
        
        <h3 className="center">No ha sido validado</h3>
        <p className="center">Realice una fotografía de cada cara del dni</p>
        <h1>Front</h1>
        <FilePond
        name="frontal"
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

            
            
            
            )}
    </div>

   )
 }
