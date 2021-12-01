import React from 'react'
import { useSelector } from 'react-redux';
import QRCode from "react-qr-code";
import '../../Styles/qr.scss'
const QrPage = () => {
    const token = useSelector(state => state.auth.authToken)
    console.log(token);
    return (
        <div className="qr-page">
            <h1>Por favor, escanee el siguiente código QR con su smartphone.</h1>
            <div className="qr-wrapper">
                <QRCode value={token} />
            </div>

        </div>
    )
}

export default QrPage;
