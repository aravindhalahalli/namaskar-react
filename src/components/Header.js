import { useContext, useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const [btnName, setBtnName] = useState("Login");
  const user = useContext(UserContext);

  const handleBtnName = () => {
    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
  };

  // if there was no dependancy array useeffcet will call every rener/re-render
  // if there was an dependancy array exist,it will call only there was change in an dependancy array
  useEffect(() => {
    console.log("useEffect called");
  }, []);
  console.log("Header Render");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "contact-us" },
    // { name: "cart", href: "/cart" },
    { name: "Grcocery", href: "grocery" },
  ];

  // Subscribing to the store using an Selector.
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center gap-x-12">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={LOGO_URL} className="h-20 w-auto" alt="logo" />
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <Link
                key="cart"
                to="/cart"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cart ({cartItems.length} items)
              </Link>
            <a href="#">{user.loggedInUser}</a>
          </div>
        </div>
        <div className="hidden lg:flex">
          <button
            onClick={handleBtnName}
            className="text-sm/6 font-semibold text-gray-900"
          >
            {onlineStatus ? "✅" : "🟥"} {btnName}{" "}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
