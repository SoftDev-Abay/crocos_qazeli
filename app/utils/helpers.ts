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

export function getPropByString(obj, propString) {
  if (!propString) return obj;

  let prop,
    props = propString.split(".");

  let i = 0;
  let iLen = props.length - 1;

  for (; i < iLen; i++) {
    prop = props[i];

    let candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  return obj[props[i]];
}
