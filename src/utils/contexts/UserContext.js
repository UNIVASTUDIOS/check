import React, { createContext, useState, useEffect } from "react";
import { getRequest } from "../../components/apiRequests/requestApi";
import { formatDateString } from "..";
import userProfile1 from "../../assets/images/userProfile1.png";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [codeToken, setCode] = useState("");

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/auth/profile");
      const userDetails = response ? response.data : null;
      return userDetails;
    } catch (error) {
      console.error(error);
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  const setUserDetails = (details) => {
    setUser(details);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      const result = {
        ...response,
        dob: formatDateString(response?.dob, "short"),
        bgClass: "bg-FD8D84",
        avatar: userProfile1,
        country: "Nigeria",
      };
      // if (userDetails) {
      setUser(result);
      // }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <UserContext.Provider
      value={{
        user,
        setUserDetails,
        getUser,
        codeToken,
        setCode,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
