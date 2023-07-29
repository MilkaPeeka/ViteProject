
import { createBrowserRouter } from "react-router-dom";
import SignInView from "./views/SignInView";
import AddRekemView from "./views/AddRekemView";
import DashboardView from "./views/DashboardView";

createBrowserRouter([
  {path: '/', element: <SignInView />},
  {path: '/addRekem', element: <AddRekemView />}
  {path: '/dashboard', element: <DashboardView />},
]);

const App = () => {

  return (
    <div>
    </div>
  );
};

export default App;