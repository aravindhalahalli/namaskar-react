import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const response = await data.json();
    setResInfo(response.data)
  };

  useEffect(() => {
    fetchData();
  }, []);
  return resInfo;
};

export default useRestaurantMenu;
