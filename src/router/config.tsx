import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import BookingPage from "../pages/booking/page";
import AcademyPage from "../pages/academy/page";
import MixesPage from "../pages/mixes/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
  {
    path: "/academy",
    element: <AcademyPage />,
  },
  {
    path: "/mixes",
    element: <MixesPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
