import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export const AxiosContext = createContext<AxiosInstance>({} as AxiosInstance);

export default function AxiosProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const router = useRouter();

  const axiosInstance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: "https://qazeli-new-back-dev.crocos.kz",
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.request.use((config) => {
      // Read token from anywhere, in this case directly from localStorage
      const token = Cookies.get("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            // Try to refresh the token here
            const refreshToken = Cookies.get("refresh_token");
            const response = await axiosInstance.post("/refresh-token", {
              refresh_token: refreshToken,
            });

            const newAccessToken = response.data.access_token;
            Cookies.set("access_token", newAccessToken);

            // Retry the original request with the new access token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance.request(error.config);
          } catch (refreshError) {
            // Refresh token failed, perform logout logic here
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            router.push("/auth/sign-in");
          }
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, []);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useAxios() {
  return useContext(AxiosContext);
}
