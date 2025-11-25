import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { ClientDashboard } from "../components/ClientDashboard";
import { BarberDashboard } from "../components/BarberDashboard";
import { AdminDashboard } from "../components/AdminDashboard";
import { AuthGuard } from "../components/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/client",
    element: (
      <AuthGuard requiredRole="client">
        <ClientDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/barber",
    element: (
      <AuthGuard requiredRole="barber">
        <BarberDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/admin",
    element: (
      <AuthGuard requiredRole="admin">
        <AdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
