/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../services/api";
import { AuthState } from "../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AuthContextType extends AuthState {
  login: (mobileNumber: string, password: string) => Promise<void>;
  register: (
    name: string,
    mobileNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await auth.getProfile();
          setAuthState({
            user: data,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          localStorage.removeItem("token");
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          console.error("Failed to fetch user profile", error);
        }
      }
    };

    initAuth();
  }, []);

  const login = async (mobileNumber: string, password: string) => {
    try {
      const { data } = await auth.login({ mobileNumber, password });
      localStorage.setItem("token", data.token);
      setAuthState({
        user: data,
        token: data.token,
        isAuthenticated: true,
      });
      navigate("/chat");
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (
    name: string,
    mobileNumber: string,
    password: string
  ) => {
    try {
      const { data } = await auth.register({ name, mobileNumber, password });
      localStorage.setItem("token", data.token);
      setAuthState({
        user: data,
        token: data.token,
        isAuthenticated: true,
      });
      navigate("/chat");
      toast.success("Registered successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
