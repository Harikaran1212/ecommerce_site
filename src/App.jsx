// react router
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";

// react toast
import { Toaster } from "react-hot-toast";

  import Admin from "./pages/Admin";
  import AdminOrders from "./pages/AdminOrders";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/explore/:category" element={<ExploreProduct />}></Route>
      <Route path="/product/:productId" element={<Product />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/login" element={<AdminLogin />}></Route>
      <Route path="/admin/orders" element={<AdminOrders />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontSize: "1.6rem",
          },
        }}
      />
    </>
  );
}

export default App;
