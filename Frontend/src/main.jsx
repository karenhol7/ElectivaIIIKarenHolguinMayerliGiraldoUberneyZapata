import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { SignUp } from "./pages/SingUp/SignUp.jsx";
import { Login } from "./pages/login/Login.jsx";
import { ProtectedRoute } from "./services/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";
import { ProductProvider } from "./context/ProductContext.jsx"; 
import { ProductDetail } from "./pages/product/ProductDetail/ProductDetail.jsx";
import { CreateProduct } from "./pages/product/CreateProduct/CreateProduct.jsx";
import { UserProfile } from "./pages/userProfile/UserProfile.jsx";
import { NetworkComponent } from "./pages/network/Network.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/network/",
        element: <NetworkComponent />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>  {/* Envuelve RouterProvider con ProductProvider */}
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
