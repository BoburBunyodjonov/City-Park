import { createTheme, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protextedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./i18n";
import RootLayout from "./layout/rootLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Details from "./pages/details/Details";
import Home from "./pages/home/container";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

let theme = createTheme({
  palette: {
    primary: {
      main: "#20a582",
    },
    // secondary: {
    //   main: "#edf2ff",
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Adjust for Button
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Adjust for TextField
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Adjust for OutlinedInput
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Adjust for Select
        },
      },
    },
  },
});

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
      </>
    )
  );

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
