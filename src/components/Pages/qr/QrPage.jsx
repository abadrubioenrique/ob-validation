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
            <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '')} to={`/files/${token}`}>
                            Subir imágenes</NavLink>

        </div>
    )
}

export default QrPage;
