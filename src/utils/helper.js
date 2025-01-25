import { subDomainList } from "./constant.js";

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main);
  if (subdomain === "") return mainApp.app;

  const apps = subDomainList.find((app) => subdomain === app.subdomain);

  return apps ? apps.app : mainApp.app;
};

// http://url.localhost:5173/xelMSAqE
// http://url.produrl.com/xelMSAqE
export const getSubDomain = (location) => {
  const locationParts = location.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return locationParts.slice(0, sliceTill).join("");
};
