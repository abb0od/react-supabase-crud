// PrivateRoute.js
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import LoadingOverlay from "./LoadingOverlay"; // optional spinner

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.access_token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <LoadingOverlay show={true} />; // optional full-screen spinner

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
}
