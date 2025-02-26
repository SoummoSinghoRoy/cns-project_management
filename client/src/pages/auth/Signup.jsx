import React, {useState} from "react";
import logo from '../../asset/images/logo.png';
import '../../asset/styles/auth.css';
import {signupFetcher} from "../../fetcher/auth.fetcher";
import {Alert} from "../../components/Alert";
import {useNavigate} from 'react-router';

function Signup () {
  const navigate = useNavigate();
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    password: '',
    designation: '',
    department: ''
  });
  const [apiResponse, setApiResponse] = useState({});

  const handleChange = (event) => {
    let {name, value} = event.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupFormData({
      username: '',
      password: '',
      designation: '',
      department: ''
    });
    const signupData = await signupFetcher(signupFormData);
    
    if(signupData.data.statusCode === 200) {
      navigate('/login');
    } else if(signupData.data.statusCode === 400) {
      setApiResponse(signupData.data)        
    }
  };
  
  return (
    <div className="container ">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-12 col-lg-4 col-md-4">
          {
            !apiResponse.success && 
            <Alert alertStatus={apiResponse.statusCode} alertMessage={apiResponse.message} updateApiResponse={setApiResponse}/>
          }
          <img 
            src={logo} 
            alt="Logo" 
            className="img-fluid mx-auto d-block"
            width="160"
            height= "auto"
          />
          <div className="card px-2 py-3 py-lg-4 py-md-4 justify-content-center form-card">
            <h4 className="text-center">SignUp Now</h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="mb-2">Username</label>
                  <input 
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
                    value={signupFormData.username}
                    autoComplete="true"
                  />
                  {
                    apiResponse.statusCode === 400 &&
                    <div className="invalid-feedback d-block">
                      { apiResponse.error.message?.username }
                    </div>
                  }
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">Password</label>
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    value={signupFormData.password}
                    autoComplete="true"
                  />
                  {
                    apiResponse.statusCode === 400 &&
                    <div className="invalid-feedback d-block">
                      { apiResponse.error.message?.password }
                    </div>
                  }
                </div>

                <div className="mb-3">
                  <label htmlFor="designation" className="mb-2">Designation</label>
                  <input 
                    type="text"
                    id="designation"
                    name="designation"
                    className="form-control"
                    onChange={handleChange}
                    value={signupFormData.designation}
                    autoComplete="true"
                  />
                  {
                    apiResponse.statusCode === 400 &&
                    <div className="invalid-feedback d-block">
                      { apiResponse.error.message?.designation }
                    </div>
                  }
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="mb-2">Department</label>
                  <input 
                    type="text"
                    id="department"
                    name="department"
                    className="form-control"
                    onChange={handleChange}
                    value={signupFormData.department} 
                    autoComplete="true"
                  />
                  {
                    apiResponse.statusCode === 400 &&
                    <div className="invalid-feedback d-block">
                      { apiResponse.error.message?.department }
                    </div>
                  }
                </div>

                <p>Already have an account? <a href="/login">Login</a></p>
                <button type="submit" className="btn btn-outline-secondary form-button">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;