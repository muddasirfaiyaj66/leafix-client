import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Shop/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'shop',
        element:<Shop/>
      },
      {
        path: "product/:id",
        element:<Product></Product>
      }
    ],
  },
]);

export default router;
