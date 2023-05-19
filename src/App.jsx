import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentLogin from "./login/StudentLogin";
import Register from "./register/Register";
import StudentDashboard from "./dashboard/student/StudentDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentLogin/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path:"/studentdashboard",
    element:<StudentDashboard/>
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
