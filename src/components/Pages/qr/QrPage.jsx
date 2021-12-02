import React from 'react'
import {  NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QRCode from "react-qr-code";
import '../../Styles/qr.scss'
const QrPage = () => {
    const token = useSelector((state) => state.auth.authToken)
    const baseUrl = "https://ob-validation.vercel.app/#/files";
    const filesUrl = `${baseUrl}/${token}`;
    console.log(filesUrl);
    return (
        <div className="qr-page">
            <h1>Por favor, escanee el siguiente código QR con su smartphone.</h1>
            <div className="qr-wrapper">
                <QRCode value={filesUrl} />
            </div>
            <h3>o</h3>
            <div className="upload">
            <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '')} to={`/files/${token}`}>

                            <span className="icono-upload"><i className="bi bi-cloud-arrow-up-fill upload"><p>Suba las imágenes desde el ordenador</p></i></span>
                            
            </NavLink>

            </div>
            

        </div>
    )
}

export default QrPage;
