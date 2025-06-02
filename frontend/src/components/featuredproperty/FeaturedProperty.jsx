import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4&min=1500&max=2000"
  );

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="PropertyList flex flex-wrap justify-between gap-1 p-2">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error loading properties</p>
      ) : (
        data.map((item) => (
          <div
            className="propertyContainer border border-gray-200 rounded-md shadow-md w-[200px] overflow-hidden"
            key={item._id}
          >
            <div className="h-[160px] w-full overflow-hidden">
              <img
                src={item.photos?.[0] || fallbackImage}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-3 space-y-1">
              <h1 className="text-lg font-semibold">{item.name}</h1>
              <p className="text-sm text-gray-500">{item.city}</p>
              <p className="text-sm">
                Starting From{" "}
                <span className="text-green-700 font-medium">
                  ${item.cheapestPrice}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                {item.rating && (
                  <button className="px-2 py-1 bg-blue-800 text-white text-xs rounded">
                    {item.rating}
                  </button>
                )}
                {item.rating && <span className="text-sm">Excellent</span>}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedProperty;
