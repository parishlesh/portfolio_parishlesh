import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_REACT_APP_BASE_URL;


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || sessionStorage.getItem("token") || ""
  );
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);
  const authorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true);

  const storeTokenInLS = (serverToken, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", serverToken);
    } else {
      sessionStorage.setItem("token", serverToken);
    }
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) {
      console.error("No token available for authentication");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Failed to authenticate user");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setService(data.response[0].services);
      } else {
        console.log("Failed to fetch services");
      }
    } catch (error) {
      console.log(`Services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    getServices();
    // eslint-disable-next-line
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        logoutUser,
        user,
        service,
        authorizationToken,
        token,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

export const AuthContext = createContext();