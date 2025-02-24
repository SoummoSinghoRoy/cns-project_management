import React, {useState} from "react";
import logo from '../../asset/images/logo.png';
import '../../asset/styles/signup.css';
import { signupFetcher } from "../../fetcher/auth.fetcher";
import { Alert } from "../../components/Alert";

function Signup () {
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    password: '',
    designation: '',
    department: ''
  });
  const [validationResult, setValidationResult] = useState({});
  const [message, setMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);

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
      console.log(signupData.data);
      
    } else {
      setMessage(signupData.data.message);
      setValidationResult({
        ...validationResult,
        validationResult: signupData.data.error
      });
      setResponseStatus(signupData.data.statusCode)      
    }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-12 col-lg-6 col-md-6">
          {
            responseStatus !== 200 &&  <Alert alertStatus={responseStatus} alertMessage={message}/>
          }
          <img 
            src={logo} 
            alt="Logo" 
            className="img-fluid mx-auto d-block"
            width="160"
            height= "auto"
          />
          <div className="card mx-lg-5 px-2 py-3 px-lg-4 px-md-4 py-lg-4 py-md-4 justify-content-center signup-card">
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