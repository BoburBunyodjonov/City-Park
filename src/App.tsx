// src/App.tsx
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import Home from "./pages/home/container/Home";
import Details from "./pages/details/Details";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/protextedRoute/ProtectedRoute'; // ProtectedRoute import qiling

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/admin/manage-users" element={<ProtectedRoute element={<ManageUsers />} />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};

export default App;
