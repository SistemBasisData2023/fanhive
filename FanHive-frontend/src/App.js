import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authenticationContext";
import Fic from "./pages/fic/Fic";
import FicWrite from "./pages/write/FicWrite";
import ChapterWrite from "./pages/write/ChapterWrite";
import { QueryClient, QueryClientProvider } from "react-query";
import FollowHome from "./pages/followHome/FollowHome";

function App() {
  const { loggedUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  console.log(darkMode);

  const ProtectedRoute = ({ children }) => {
    if (!loggedUser) {
      return <Navigate to="/login/" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`mode-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/fic/:id",
          element: <Fic />,
        },
        {
          path: "/write/",
          element: <FicWrite />,
        },
        {
          path: "/write/:id/ch/",
          element: <ChapterWrite />,
        },
        {
          path: "/followed/:id",
          element: <FollowHome />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
