import React from 'react';
import "../asset/styles/navbar.css";
import logo from '../asset/images/logo-nav.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { tokenDecoder } from '../utility/token_decoded';

export function Navbar() {
  const {authToken, logout, setAuthToken} = useAuth();
  const navigate = useNavigate();
  const decodeResult = tokenDecoder(authToken);

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
        <nav className="navbar navbar-expand-lg d-none d-lg-block d-md-none d-lg-flex custom-navbar">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" className="img-fluid ps-3" width="90" height="auto"/>
            </Link>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-auto">
              <li className="nav-item">
                <Link className="nav-link text-body-emphasis fw-medium nav-text" aria-current="page" to="/">Home</Link>
              </li>
              {
                decodeResult.employeeType === 'coordinator' ?
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-body-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Project
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/project/add">Add project</Link></li>
                    <li><Link className="dropdown-item" to="/project/all">All projects</Link></li>
                  </ul>
                </li> :
                <li className="nav-item">
                  <Link className="nav-link text-body-emphasis fw-medium nav-text" to="/project/all">Projects</Link>
                </li>
              }
              
              {
                decodeResult.employeeType === 'admin' && 
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-body-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Employee
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/employee/registration">Add employee</Link></li>
                    <li><Link className="dropdown-item" to="/employee/all">All employee</Link></li>
                  </ul>
                </li>
              }
            </ul>
            <div className='logout-btn pe-2 ms-lg-auto'>
              <button type="button" className="btn btn-outline-secondary fw-semibold me-2" onClick={logouthandler}>logout</button>
            </div>
          </nav>

        {/* small screen navbar */}
        <nav className="navbar d-block d-lg-none d-md-block navbar-container">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" className="img-fluid px-2" width="80" height="auto"/>
            </Link>
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
                    <Link className="nav-link text-warning-emphasis fw-medium nav-text" aria-current="page" to="/">Home</Link>
                  </li>
                  {
                    decodeResult.employeeType === 'coordinator' ?
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle text-body-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Project
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/project/add">Add project</Link></li>
                        <li><Link className="dropdown-item" to="/project/all">All projects</Link></li>
                      </ul>
                    </li> :
                    <li className="nav-item">
                      <Link className="nav-link text-body-emphasis fw-medium nav-text" to="/project/all">Projects</Link>
                    </li>
                  }
                  
                  {
                    decodeResult.employeeType === 'admin' && 
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle text-body-emphasis fw-medium nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Employee
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/employee/registration">Add employee</Link></li>
                        <li><Link className="dropdown-item" to="/employee/all">All employee</Link></li>
                      </ul>
                    </li>
                  }
                </ul>
                <div className='d-grid col-6 logout-btn'>
                  <button type="button" className="btn btn-outline-secondary fw-semibold" onClick={logouthandler}>logout</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
};