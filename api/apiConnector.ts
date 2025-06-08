import axios from "axios"

export const apiConnector = async (method: string, url: string, body = {}, headers = {}) => {
  try {
    
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIwNzllZmE2NzgyMzlmNjA1NzRjNTMiLCJlbWFpbCI6ImFkbWluTmVsc19CYXVtYmFjaDg2QGV4YW1wbGUuY29tIiwiYWNjb3VudFR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODMyNTc2NiwiZXhwIjoxNzQ4OTMwNTY2fQ.qBfMeaGngcgRPJEz-qxEwVv3T3Oafn_uG263hNNPYVA';
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIwNzllZmE2NzgyMzlmNjA1NzRjNTMiLCJlbWFpbCI6ImFkbWluTmVsc19CYXVtYmFjaDg2QGV4YW1wbGUuY29tIiwiYWNjb3VudFR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODUxMTUyOSwiZXhwIjoxNzQ5MTE2MzI5fQ.yap53rVw9yNz4-Wvk_6KaEtB5PwJ1YFo5Pljuau4RHs';
    
    /*
    //Adding token to headers if found
    const updatedHeaders = {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
      */
    console.log(">>> FETCHING", method, url);
    //console.log(updatedHeaders);  
    console.log("→ Headers Received:", headers);
    console.log("Body:",body);
    
    //then sending API request to backend with axios
    const response = await axios({
      method,
      url,
      data: body,
      //headers:updatedHeaders,
      headers,
      withCredentials: true,
    })
    

    console.log("API Response:", response);

    return response
  } catch (error: any) {
    throw error?.response?.data || { message: "API Error" }
  }
}

