import { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UserContext from '../utils/UserContext'

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {setUserName,loggedInUser} = useContext(UserContext);

  const handleRestaurantsSearch = () => {
    const filterdata = listOfRestaurants.filter((restaurant) =>
      restaurant.info?.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
    setFilterList(filterdata);
  };

  const getTopRestaurants = (restaurantlists) => {
    const filterdata = restaurantlists.filter(
      (restaurant) => restaurant.info.avgRating > 4.5
    );
    setFilterList(filterdata);
  };

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const response = await data.json();
    setListOfRestraunt(
      response.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilterList(
      response.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const RestaurantCardPromotedCard = withPromotedLabel(RestaurantCard);
  

  //whenever there is change in state variable, react will re-render the component and change the dom wherever it finds an diffarnace between two virtaul dom and change actual dom.
  console.log("Body render", listOfRestaurants);

  return (
    <div className="w-auto h-auto">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between align-middle gap-4 w-full">
            <div className="flex justify-start align-middle gap-4 w-2/4">
              <input
                type="search"
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={handleRestaurantsSearch}
              >
                Search
              </button>
            </div>
            <div className="flex justify-start align-middle gap-4 items-center">
              <label>User</label>
              <input
                type="type"
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={loggedInUser}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <button
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => getTopRestaurants(listOfRestaurants)}
            >
              Top Rated Restaurants
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {listOfRestaurants.length === 0 ? (
              <Shimmer />
            ) : (
              filterList.map((restaurant) => (
                <Link
                  key={restaurant?.info?.id}
                  to={`restaurants/${restaurant.info.id}`}
                >
                  {/* If the restaurant has more rating then promoto else keep it as it is */}
                  {restaurant?.info?.avgRating >= 4.5 ? (
                    <RestaurantCardPromotedCard resData={restaurant} />
                  ) : (
                    <RestaurantCard resData={restaurant} />
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
