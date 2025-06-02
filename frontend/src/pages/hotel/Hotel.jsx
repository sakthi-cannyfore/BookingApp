import { format } from "date-fns";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router";
import SearchItems from "../../components/searchItems/SearchItems";
import useFetch from "../../components/hooks/useFetch";
import { SearchContext } from "../../components/context/SearchContext";

const Hotel = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, Error } = useFetch(
    `/api/hotels/q?city=${destination}&min=${min | 0}&max=${max || 99999}`
  );

  const { dates } = useContext(SearchContext);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full lg:w-[350px] bg-[#003580] shadow-md p-4 rounded-md sticky top-4 h-fit">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Search Filters
        </h2>

        <div className="mb-4">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            placeholder="Enter destination"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Date
          </label>
          <span
            onClick={() => setOpenDate(!openDate)}
            className="block w-full p-2 border border-gray-100 rounded-md cursor-pointer bg-white"
          >
            {`${format(dates[0].startDate, "dd-MM-yyyy")} to ${format(
              dates[0].endDate,
              "dd-MM-yyyy"
            )}`}
          </span>

          {openDate && (
            <div className="mt-2">
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="minprice"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Min Price
          </label>
          <input
            type="number"
            id="minprice"
            min={0}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min price"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxprice"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Max Price
          </label>
          <input
            type="number"
            id="maxprice"
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max price"
            min={0}
            className="w-full p-2 border border-gray-300 rounded-md text-black bg-white "
          />
        </div>
        <h1 className="text-white text-lg font-semibold my-[10px]">Options</h1>
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-white text-lg font-semibold">Adult</h1>
          </div>

          <div>
            <input
              type="number"
              id="maxprice"
              placeholder={options.adult}
              value={options.adult}
              min={0}
              className="w-full p-2 border border-gray-300 rounded-md text-black bg-white "
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-white text-lg font-semibold">Children</h1>
          </div>

          <div>
            <input
              type="number"
              id="maxprice"
              placeholder={options.children}
              min={0}
              className="w-full p-2 border border-gray-300 rounded-md text-black bg-white "
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-white text-lg font-semibold">Room</h1>
          </div>

          <div>
            <input
              type="number"
              id="maxprice"
              placeholder={options.room}
              min={1}
              className="w-full p-2 border border-gray-300 rounded-md text-black bg-white "
              onChange={(e) => setOptions(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <p className="text-gray-700 leading-relaxed"></p>
        {loading ? (
          "Loading"
        ) : (
          <>
            {data.map((item) => (
              <SearchItems key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Hotel;
