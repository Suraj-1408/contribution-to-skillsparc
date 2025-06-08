// src/api/organizationAPI.ts
import { apiConnector } from "./apiConnector";
import { organizationEndpoints } from "./apis/organizationEndpoints";
import { toast } from "react-hot-toast";

// Hardcoded token 
//const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODA3NDQxYzE1MWNkMzczZGJmZjBmYWMiLCJlbWFpbCI6ImFkbWluMkBleGFtcGxlLmNvbSIsImFjY291bnRUeXBlIjoiYWRtaW4iLCJpYXQiOjE3NDYzODc4MzYsImV4cCI6MTc0NjQ3NDIzNn0.fFltqLcC9e71j5o2OLC1BBN1wDe_jY4oY-DaxvB_ZgM"; // your full token

  //const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIwNzllZmE2NzgyMzlmNjA1NzRjNTMiLCJlbWFpbCI6ImFkbWluTmVsc19CYXVtYmFjaDg2QGV4YW1wbGUuY29tIiwiYWNjb3VudFR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODUxMTUyOSwiZXhwIjoxNzQ5MTE2MzI5fQ.yap53rVw9yNz4-Wvk_6KaEtB5PwJ1YFo5Pljuau4RHs';
  const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNiMjllZDdlMTU0Y2JjZmYyOWRkNDciLCJlbWFpbCI6Imhhc2FuQGdyaXNtLmNvIiwiYWNjb3VudFR5cGUiOiJhZG1pbiIsImlhdCI6MTc0OTEyMTA3NSwiZXhwIjoxNzQ5NzI1ODc1fQ.6SaLVYHGNcUqz0nc6ltp3Wfbegzi05Iw2wv8Mx0f5vY';

const { CREATE_ORGANIZATION_API,
      GET_ALL_ORGANIZATIONS_API,
      UPDATE_ORGANIZATION_API,
} = organizationEndpoints;



//API Call defintion to cretae a new organisation.
export const createOrganization = async (data: any) => {
  try {
    console.log("CREATE ORG - Token used:", ADMIN_TOKEN); // Add this

    const response = await apiConnector("POST", CREATE_ORGANIZATION_API, data, {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    });

    if (!response.data.success) {
      throw new Error("Organization creation failed");
    }

    toast.success("Organization created successfully");
    return response.data.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to create organization");
    throw error;
  }
};


//API call defintion to get all created organisations from backend, instead of shwoing mock data
export const getAllOrganizations = async () => {
  try {

    console.log("GET ORGS - Token used:", ADMIN_TOKEN); 

    const response = await apiConnector("GET", GET_ALL_ORGANIZATIONS_API, null, {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    });

    // Log full request info
    console.log("Fetching organizations:");
    console.log("→ URL:", GET_ALL_ORGANIZATIONS_API);
    console.log("→ Method: GET");
    console.log("→ Headers:", {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    });
    console.log("→ Body: (none)"); // GET calls don't send body
 
    if (!response.data.success) {
      throw new Error("Failed to fetch organizations");
    }

    return response.data.data.organizations || response.data.data;
  } catch (error: any) {
    toast.error(error?.message || "Could not fetch organizations");
    throw error;
  }
};


//API call definition to fetch the organisation by organisationId
export const getOrganizationById = async (organizationId: string) => {
  try {
    console.log("GET ORG BY ID - Token used:", ADMIN_TOKEN);

    const response = await apiConnector(
      "POST",
      organizationEndpoints.GET_ORGANIZATION_BY_ID_API,
      { organizationId }, 
      {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to fetch organization");
    }

    toast.success("Organization fetched successfully");

    return response.data.data;
  } catch (error: any) {
    toast.error(error?.message || "Could not fetch organization");
    throw error;
  }
};


//Function to update organisation field such as name and email.
export const updateOrganization = async (data: {
  id: string;
  name?: string;
  organization_admin_email?: string;
}) => {
  try {
    console.log("UPDATE ORG - Token used:", ADMIN_TOKEN);
    console.log("Payload to send:", JSON.stringify(data, null, 2));

    const response = await apiConnector("PUT", UPDATE_ORGANIZATION_API, data, {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      "Content-Type": "application/json",
    });

    console.log("Response from update API:", response?.data);

    if (!response.data.success) {
      throw new Error("Failed to update organization");
    }

    toast.success("Organization updated successfully");
    return response.data.data;
  } catch (error: any) {
    console.error("Full error object:", error); 

    toast.error(error?.response?.data?.message || "Could not update organization");
    throw error;
  }
};
