import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../../../App.css';
const Notfoundpage = () => {

    const navigate = useNavigate();

    return (
        <div className="App">
        <header className="App-header">
            <h1>404 - Page Not Found</h1>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
                Go back to home
            </button>
            </header>
      </div>
    );
}

export default Notfoundpage;
