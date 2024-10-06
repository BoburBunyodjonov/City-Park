import { createTheme, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/protextedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./i18n";
import RootLayout from "./layout/container";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Details from "./pages/details/container";
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
          borderRadius: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<AdminDashboard />}
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
