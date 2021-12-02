import React, { useEffect, useState } from 'react';
import { FilePond } from 'react-filepond';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Styles
import 'filepond/dist/filepond.min.css';
import './validation.scss'
import { getUserInfo } from '../../store/slices/user';


export const FilepondComponent = (props) => {
     window.onbeforeunload = function() {
        localStorage.removeItem('USER_INFO');
        localStorage.removeItem('TOKEN_KEY');
     }
    const API_URL = 'https://obvalid4.herokuapp.com';
    const [cargandoUsuario, setCargandoUsuario] = useState(true);

    // Nuevo
    const location = useLocation();
    const dispatch = useDispatch();
    const userData  = useSelector((state) => state.user.userInfo);
    console.log(userData)
    const authToken = location.pathname.split('/files/')[1];
    console.log(authToken)

    useEffect(() => {
        async function cargarUsuario() {
            if (authToken === null ) {
                setCargandoUsuario(false);
                return;
            }
            try {
                if(userData === null) {
                    dispatch(getUserInfo(authToken))
                }
                localStorage.setItem('TOKEN_KEY',authToken);
                setCargandoUsuario(false);
            } catch (error) {
                console.log("Error al recuperar sus daotos. Empieze el proceso de nuevo.")
            }
        }
        cargarUsuario();

    }, [authToken, dispatch, userData]);
    return (
        <div >
            <h1>Validación del Usuario</h1>


            {(userData != null) && (userData.validated) && (cargandoUsuario === false) ?

                (
                    <div>

                        <h3 className="center"><i className="bi bi-check-circle-fill validado" />Ha sido Validado</h3>
                    </div>
                )
                :
                (
                    <div>

                        <div>
                            <h3 className="center"><i className="bi bi-x-circle-fill no-validado" />No ha sido Validado</h3>
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
                                                    'Authorization': `Bearer ${authToken}`
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
                                                    'Authorization': `Bearer ${authToken}`
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
