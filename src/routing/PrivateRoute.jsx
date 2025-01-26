import "react";
import { useStoreContext } from "../contex/contextApi.jsx";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, publicPage }) {
  const { token } = useStoreContext();

  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }

  return !token ? <Navigate to="/login" /> : children;
}
