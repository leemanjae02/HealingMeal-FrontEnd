import React, { createContext, useContext, useState, ReactNode } from "react";
import CustomAxios from "../api/Axios";

interface AuthContextProps {
  loginCheck: boolean;
  userName: string;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [userName, setUserName] = useState("");

  const login = async (id: string, password: string): Promise<void> => {
    try {
      const response = await CustomAxios.post("/user/login", {
        id,
        password,
      });
      if (response.status === 200) {
        setLoginCheck(true);
        setUserName(response.data.userName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await CustomAxios.post("/user/logout");
      if (response.status === 200) {
        setLoginCheck(false);
        setUserName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loginCheck, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
