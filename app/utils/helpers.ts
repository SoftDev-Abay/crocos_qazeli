import Cookies from "js-cookie";

export const popOneRouteFromPath = (path: string): string => {
  const pathArray = path.split("/");
  pathArray.pop();
  return pathArray.join("/");
};

export const getCookieAccessToken = () => {
  return Cookies.get("access_token");
};

export const getCookieRefreshToken = () => {
  return Cookies.get("refresh_token");
};
