import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom"; // Import Redirect from react-router-dom
import SignInView from "./views/SignInView";
import AddRekemView from "./views/AddRekemView";
import DashboardView from "./views/DashboardView";
import ErrorView from "./views/ErrorView";
import Root from "./views/Root";
import mappings from "./mappings";
import SiteContextProvider from "./contexts/SiteContext";
import DefaultThemeWrapper from "./themes/DefaultThemeWrapper";
import DevView from "./views/DevView";

const router = createBrowserRouter([
  // Add a new Route for redirecting from '/' to '/dashboard'
  { path: '/', element: <Navigate to={mappings.dashboardPath} /> },
  // The existing routes
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      { path: mappings.addRekemPath, element: <AddRekemView /> },
      { path: mappings.signInPath, element: <SignInView /> },
      { path: mappings.dashboardPath, element: <DashboardView /> },
      { path: mappings.devPath, element: <DevView /> },
    ],
  },
]);

const App = () => {
  return (
    <SiteContextProvider>
      <DefaultThemeWrapper>
        <RouterProvider router={router} />
      </DefaultThemeWrapper>
    </SiteContextProvider>
  );
};

export default App;