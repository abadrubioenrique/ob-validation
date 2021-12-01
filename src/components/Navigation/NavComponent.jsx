       <div>
            {userInfo != null ?
                <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
                <div className="container-fluid">
                <div className="navbar-brand mb-0 h1 text-light" ><div className="background-layer">
                    <h2 className="logo">
                    Check
                    <span>Docs</span>
                    </h2>
                </div>
                </div>
                </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-white-50">
                                Bienvenido {userInfo.name + " " + userInfo.surname}
                            </span>
                            <button
                                className="nav-item nav-link btn logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </ul>
                    </div>
                </nav>
                :
                <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
                <div className="container-fluid">
                <div className="navbar-brand mb-0 h1 text-light" ><div className="background-layer">
                    <h2 className="logo">
                    Check
                    <span>Docs</span>
                    </h2>
                </div>
                </div>
                </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                        <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light' : '')} to="/register">
                            Register</NavLink>
                        <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '')} to="/login">
                            Login</NavLink>


                    </div>
                </nav>
            }

        </div>
