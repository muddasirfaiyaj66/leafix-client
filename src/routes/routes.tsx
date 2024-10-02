import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Shop/Product";
import Cart from "../pages/Shop/Cart";
import InventoryManagement from "../pages/InventoryManagement/InventoryManagement";
import Checkout from "../pages/Shop/Checkout";

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
      },
      {
        path:'cart',
        element:<Cart/>
      },
      {
        path:'/checkout',
        element:<Checkout/>
      },
      {
        path:'inventory-management',
        element:<InventoryManagement/>
      }
    ],
  },
]);

export default router;
