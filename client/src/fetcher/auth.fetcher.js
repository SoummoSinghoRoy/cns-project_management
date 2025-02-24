import axios from "axios";

export async function signupFetcher(formData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/register",
      formData,
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
