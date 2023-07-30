
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import SignInView from "./views/SignInView";
import AddRekemView from "./views/AddRekemView";
import DashboardView from "./views/DashboardView";
import mappings from "./mappings";
/*
<Link to="/products">Click me to go to</Link>

*/
const router = createBrowserRouter([
  {path: '/', element: <SignInView />},
  {path: '/' + mappings.addRekemPath, element: <AddRekemView />},
  {path: '/' + mappings.dashboardPath, element: <DashboardView />},
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;