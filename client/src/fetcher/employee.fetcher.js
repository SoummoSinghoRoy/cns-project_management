import axios from "axios";

export async function employeeRegistrationFetcher(formData, token) {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/user/employee/register', formData,
      {
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
      }
    )
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function allEmployeeGetFetcher(token) {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/user/employee/all',
      {
        headers: {
          "authorization": token
        },
      }
    )
    return response;
  } catch (error) {
    console.log(error);
    
  }
}