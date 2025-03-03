import axios from "axios";

export async function signupFetcher(formData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/register", formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginFetcher(formData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/login", formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutFetcher(token) {
  try {
    if(token) {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "authorization": token
          },
        }
      );
      return response;
    } else {
      console.log(`Token not found`);
    }
  } catch (error) {
    console.log(error);
  }
}
