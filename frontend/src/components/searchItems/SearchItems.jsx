import { Link } from "react-router-dom";
const SearchItems = ({ item }) => {
  return (
    <div>
      <div className="flex justify-between items-center border border-gray-100 bg-gray-100 mt-[10px] relative">
        <div className="imagesection ">
          <img src={item.photos[0]} alt="" className=" w-[220px]" />
        </div>

        <div className="detailsSection flex flex-col items-start">
          <h1 className="text-sky-600 font-bold text-2xl  ">{item.name}</h1>
          <span className="my-1 text-gray-400">
            {item.distance}m fron center
          </span>
          <div>
            <button className="bg-green-600 text-white rounded-md p-1 my-1">
              Free airport taxi
            </button>
          </div>
          <p className="font-bold">Sudio Apartment with Air conditioning</p>
          <div className="text-gray-400 my-1">{item.desc}</div>
          <span className="text-green-600 font-semibold">
            Free cancellation
          </span>
          <span className="text-green-600">
            You can cancel later,so lock in this great price today!
          </span>
        </div>

        <div className="availabilitySection ">
          {item.rating && (
            <div className="flex absolute top-3 items-center ">
              <h1 className="font-semibold text-xl mr-[10px]  ">Excellent</h1>
              <span className="bg-blue-700 text-white  px-2">
                {item.rating}
              </span>
            </div>
          )}

          <div>
            <h1 className="text-2xl">${item.cheapestPrice}</h1>
            <p className="text-gray-400 p-2">includes taxes and fees</p>
          </div>
          <div className="absolute bottom-3">
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-blue-400 py-2 px-3 rounded-md text-white cursor-pointer   ">
                See Availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItems;
