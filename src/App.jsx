
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import SignInView from "./views/SignInView";
import AddRekemView from "./views/AddRekemView";
import DashboardView from "./views/DashboardView";
import ErrorView from "./views/ErrorView";
import Root from "./views/Root";
import mappings from "./mappings";
import SiteContextProvider from "./contexts/SiteContext";
import DefaultThemeWrapper from "./themes/DefaultThemeWrapper";
/*
<Link to="/products">Click me to go to</Link>

*/
const router = createBrowserRouter([
  {path: '/', element: <Root />,
  errorElement: <ErrorView />,
  children: [
    {path: '/' + mappings.addRekemPath, element: <AddRekemView />},
    {path: '/' + mappings.signInPath, element: <SignInView />},
    {path: '/' + mappings.dashboardPath, element: <DashboardView />},
  ]
  }]);

const App = () => {
  return (
    <SiteContextProvider>
      <DefaultThemeWrapper>
      <RouterProvider router={router}/>
      </DefaultThemeWrapper>
    </SiteContextProvider>
  );
};

export default App;