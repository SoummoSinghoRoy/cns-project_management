import React from "react";
// import logo from '../../asset/images/logo.png';
import '../../asset/styles/signup.css';

function Signup () {
  const handleChange = (event) => {} 
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          {/* <img 
            src={logo} 
            alt="Logo" 
            className="img-fluid"
            width="160"
            height= "auto"
          /> */}
          <div className="card signup-card mx-5 p-4">
            <h4 className="text-center">SignUp Now</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="mb-2">Username</label>
                  <input 
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">Password</label>
                  <input 
                    type="text"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="designation" className="mb-2">Designation</label>
                  <input 
                    type="text"
                    id="designation"
                    name="designation"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="mb-2">Department</label>
                  <input 
                    type="text"
                    id="department"
                    name="department"
                    className="form-control"
                    onChange={handleChange} 
                    autoComplete="true"
                  />
                </div>

                <p>Already have an account? <a href="#">Login</a></p>
                <button type="submit" className="btn btn-outline-secondary">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;