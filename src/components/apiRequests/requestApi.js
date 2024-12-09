import helpers from "../helpers/helpers";
import axios from "axios";

const { apiUrl } = helpers;

export const refreshToken = async () => {
  const token = sessionStorage.getItem("token");
  const tokens = JSON.parse(token);

  const refreshToken = tokens ? tokens.refreshToken : null;

  console.log("Token refreshed", refreshToken);

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const result = await axios.post(
      `${apiUrl}/auth/refresh-tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const { tokens } = result.data;

    console.log(tokens);
    sessionStorage.setItem("token", JSON.stringify(tokens));
    return tokens?.accessToken;
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("token");
    // throw new Error("Failed to refresh token");
  }
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    const tokens = JSON.parse(token);

    const accessToken = tokens ? tokens.accessToken : null;

    console.log("Request interceptor with Access Token", accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log(`Bearer ${accessToken}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("response error interceptor");
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// export const requestApi = async ({ url, method, data, token }) => {
//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json; charset=utf-8",
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const config = {
//     url: `${BaseUrl}${url}`,
//     method,
//     headers,
//   };

//   if (data) {
//     config.data = data;
//   }

//   console.log(config.url);

//   return axios(config)
//     .then((response) => {
//       return { result: response.data, responseStatus: true };
//     })
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         //Request made and server responded
//         return { responseStatus: false, errorMsg: error.response.data };
//       } else if (error.request) {
//         //Request made but no server response
//         return {
//           responseStatus: false,
//           errorMsg: { error: "Server error, try again later" },
//         };
//       } else {
//         return {
//           responseStatus: false,
//           errorMsg: { error: "Server error, try again later" },
//         };
//       }
//     });
// };

export const cloudinaryUpload = async ({ files }) => {
  try {
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/dqcmfizfd/upload";

    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "beatsbank");

      const uploadedFile = await fetch(url, { method: "POST", body: formData });
      const uploadedFile_data = await uploadedFile.text();
      const parsedFile = JSON.parse(uploadedFile_data);

      const { secure_url } = parsedFile;
      uploadedFiles.push(secure_url);
    }

    return { responseStatus: true, result: uploadedFiles, errorMsg: null };
  } catch (error) {
    return {
      responseStatus: false,
      result: null,
      errorMsg: {
        error: "An unexpected error occured, try again later",
        actualError: error,
      },
    };
  }
};

export const loginFunc = async (loginDetails) => {
  try {
    const result = await axios.post(`${apiUrl}/auth/login`, loginDetails);
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error?.response?.data;
  }
};

export const register = async (registerDetails) => {
  try {
    const result = await axiosInstance.post(
      `${apiUrl}/auth/register/user`,
      registerDetails
    );
    const data = result.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
export const SendEmailOTP = async (email) => {
  try {
    const result = await axiosInstance.post(`/auth/send-email-otp`, { email });
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const verifyOTP = async (details) => {
  try {
    const result = await axiosInstance.post(`/auth/verify-email-otp`, details);
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
export const forgotPassword = async (details) => {
  try {
    const result = await axiosInstance.patch(
      `/auth/send-reset-password-mail`,
      details
    );
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const resetPassword = async (details) => {
  try {
    const result = await axiosInstance.patch(`/auth/reset-password`, details);

    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const postRequest = async ({ url, data }) => {
  try {
    const result = await axiosInstance.post(url, data);

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getRequest = async (url) => {
  try {
    console.log("request initiated");

    const result = await axiosInstance.get(url);

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const patchRequest = async (url, detail) => {
  try {
    const result = await axiosInstance.patch(url, detail);

    const response = result.data;

    return response;
  } catch (error) {
    throw error.response.data;
  }
};
