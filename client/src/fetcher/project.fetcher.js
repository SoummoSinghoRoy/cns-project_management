import axios from "axios";

export async function retrieveAllProjectFetcher(token, queryParams = {}) {
  try {
    let url = `http://192.168.78.136:8080/api/v1/project`;

    if(queryParams.from && queryParams.to) {
      const params = new URLSearchParams();
      params.append('from', queryParams.from);
      params.append('to', queryParams.to);
      url += `?from=${queryParams.from}&to=${queryParams.to}`;
      const responseForQuery = await axios.get(url,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return responseForQuery;
    }
    
    const response = await axios.get(url,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
