import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";

import Shimmer from "./Shimmer";
import useOnlineStatus from "../hooks/useOnlineStatus";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const onlineStatus = useOnlineStatus();
  const [showIndex, setShowIndex] = useState(null);
  const dummy = "Dummy Data";


  // const [restaurantMenu, setRestaurantMenu] = useState(null);

  // const fetchData = async () => {
  //   const data = await fetch(MENU_API + resId);
  //   const response = await data.json();
  //   setRestaurantMenu(response?.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const restaurantMenu = useRestaurantMenu(resId);

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you are offline, please check your internet connections
      </h1>
    );
  }

  if (restaurantMenu === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    restaurantMenu?.cards[2]?.card?.card?.info;
  const itemCards =
    restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card
      ?.card.itemCards || [];
  // "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  const categories =
    restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) =>
        card.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);
  return (
<div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category, index) => (
        // controlled component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
          dummy={dummy}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
