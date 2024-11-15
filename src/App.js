import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import AboutClass from "./components/AboutClass";
// import About from "./components/About";
// import Grocery from "./components/Grocery";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";

const GroceryChunk = lazy(() => import("./components/Grocery"));
const AboutChunk = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Aravind Kumar",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutClass />
          </Suspense>
        ),
      },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/cart", element: <Cart /> },
      { path: "restaurants/:resId", element: <RestaurantMenu /> },
      {
        path: "grocery",
        element: (
          <Suspense fallback={<div>Loading....</div>}>
            <GroceryChunk />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter}>
    <AppLayout />
  </RouterProvider>
);
