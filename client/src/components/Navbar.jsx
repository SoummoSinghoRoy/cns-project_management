import React from 'react';
import "../asset/styles/navbar.css";
import logo from '../asset/images/logo-nav.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export function Navbar() {
  const {authToken, logout, setAuthToken} = useAuth();
  const navigate = useNavigate();

  const logouthandler = async (event) => {
    const logoutResponse = await logout();
    
    if(logoutResponse.statusCode === 200) {
      setAuthToken(null)
      navigate('/login')
    }
  }

  if(authToken) {
    return (
      <>
        {/* large & medium screen navbar */}
        <div className='container-fluid container-lg container-md navbar-container'>
          <nav className="navbar navbar-expand-lg d-none d-lg-block d-md-block d-lg-flex custom-navbar">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" className="img-fluid px-2" width="80" height="auto"/>
            </a>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-auto">
              <li className="nav-item">
                <a className="nav-link text-warning-emphasis fw-medium nav-text" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-warning-emphasis fw-medium nav-text" href="/project">Projects</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-warning-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Employee
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/registration">Add employee</a></li>
                  <li><a className="dropdown-item">All employee</a></li>
                </ul>
              </li>
            </ul>
            <div className='logout-btn ms-lg-auto'>
              <button type="button" className="btn btn-outline-secondary me-2" onClick={logouthandler}>logout</button>
            </div>
          </nav>
        </div>

        {/* small screen navbar */}
        <nav className="navbar d-block d-lg-none d-md-none navbar-container">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" className="img-fluid px-2" width="80" height="auto"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Lorem Ipsum</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                    <a className="nav-link text-warning-emphasis fw-medium nav-text" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-warning-emphasis fw-medium nav-text" href="/project">Projects</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-warning-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Employee
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/registration">Add employee</a></li>
                      <li><a className="dropdown-item">All employee</a></li>
                    </ul>
                  </li>
                </ul>
                <div className='d-grid col-6 logout-btn'>
                  <button type="button" className="btn btn-outline-secondary" onClick={logouthandler}>logout</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
};