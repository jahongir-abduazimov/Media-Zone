import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import LoginPage from "../../pages/login";
import Home from "../../pages/home";
import Dashboard from "../../pages/dashboard";
import IncomeExpence from "../../pages/income-expense";
import Clients from "../../pages/clients";
import NotFound from "../../pages/notFound";
import EstimatePage from "../../pages/estimate";
import RoomsPage from "../../pages/rooms";
import RoomId from "../../pages/room-id";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Dashboard />} />
          <Route path="/income-expense" element={<IncomeExpence />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomId />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
