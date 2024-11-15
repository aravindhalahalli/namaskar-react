import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, totalRatingsString, id } =
    resData?.info;

  return (
    <div key={id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          alt={name}
          src={CDN_URL + cloudinaryImageId}
          className="size-full object-cover object-center lg:size-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{cuisines.join(", ")}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {totalRatingsString}
        </p>
      </div>
    </div>
  );
};

// Higher order component
// input - RestorantCard and output - RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestaurantCard  {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
