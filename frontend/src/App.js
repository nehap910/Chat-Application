import Signup from "./components/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Loginn from "./components/Loginn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },

  {
    path: "/register",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Loginn />,
  },
]);
function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
