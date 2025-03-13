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
            "authorization": token
          },
        }
      );
      return responseForQuery;
    }
    
    const response = await axios.get(url,
      {
        headers: {
          "authorization": token
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function generateReportFetcher(token, queryParams) {
  try {
    const response = await axios.post('http://192.168.78.136:8080/api/v1/project/generate-report', queryParams,
      {
        headers: {
          "authorization": token,
          "Accept": "application/pdf",
        },
        responseType: "arraybuffer",
      }
    )
    const contentType = response.headers['content-type'];

    if (contentType === 'application/pdf') {
      return {
        report: {
          success: true,
          result: response.data
        }
      };
    } else {
      const decoder = new TextDecoder('utf-8');
      const jsonResponse = JSON.parse(decoder.decode(new Uint8Array(response.data)));
      return {
        report: jsonResponse
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function retrieveCoordinatorProjectFetcher(token, coordinatorId) {
  try {
    const response = await axios.get(`http://192.168.78.136:8080/api/v1/project/all/coordinator/${coordinatorId}`, 
      {
        headers: {
          "authorization": token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function retrieveAssistantProjectFetcher(token, assistantId) {
  try {
    const response = await axios.get(`http://192.168.78.136:8080/api/v1/project/all/assistant/${assistantId}`, 
      {
        headers: {
          "authorization": token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function retrieveAvailableTeamMember(token) {
  try {
    const response = await axios.get(`http://192.168.78.136:8080/api/v1/user/employee/available`, 
      {
        headers: {
          "authorization": token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function projectAddFetcher(token, formData) {
  try {
    const response = await axios.post(`http://192.168.78.136:8080/api/v1/project/add`, formData,
      {
        headers: {
          "Content-Type": "application/json", 
          "authorization": token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
} 

export async function projectStatusUpdateFetcher(token, projectId, status) {
  try {
    const response = await axios.patch(`http://192.168.78.136:8080/api/v1/project/update/status/${projectId}`, 
      status,
      {
        headers: {
          "authorization": token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error)
  }
}