import "./Header.css";
import {
  faBed,
  faCalendar,
  faCar,
  faGroupArrowsRotate,
  faPeopleGroup,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { SearchContext } from "../../components/context/SearchContext";
import { AuthContext } from "../../components/context/AuthContext";

const Header = ({ type }) => {
  const { user } = useContext(AuthContext);

  const [openDate, setOpenDate] = useState(false);
  const [openoptions, setopenoptions] = useState(false);
  const [destination, setDestination] = useState("");
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = (e) => {
    setDestination(e.target.value);
    if (destination) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });

      navigate("/hotels", { state: { destination, dates, options } });
    }
  };
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
    if (options < 0) {
    }
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listmode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItems active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <h1 className=" headerTitle mt-[20px] text-xl font-bold">
              A lifetime of discount? It's Genius.
            </h1>
            <p className="headerDesc">
              Get reward for Your travels - unlock instant saving of 10% or more
              with a free LamaBooking account
            </p>

            {!user && (
              <button className="headerbtn mt-[20px] px-2 border-1 py-2 rounded-sm bg-white hover:bg-[#003580] hover:text-white text-[#003580] cursor-pointer">
                Sign in/ Register
              </button>
            )}
            <div className="headerSearch flex flex-col gap-4 p-3 w-full md:flex-row md:items-center md:justify-between md:border-4 border-amber-300 bg-white md:relative md:top-[135px]">
              <div className="headersearchItems flex items-center">
                <FontAwesomeIcon
                  icon={faBed}
                  className="icon mr-2 w-[50px] text-gray-600"
                />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="text-gray-800 w-[200px] px-3 py-2 h-[40px] border border-gray-300 rounded-md focus:outline-none "
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="headersearchItems flex items-center z-2">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="icon mr-2 text-gray-600"
                />
                <span
                  className="text-gray-400  text-sm cursor-pointer"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(dates[0].startDate, "dd-MM-yyyy")} to ${format(
                  dates[0].endDate,
                  "dd-MM-yyyy"
                )}`}</span>
              </div>

              <div className="headersearchItems flex items-center z-2">
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="icon  text-gray-600  w-[50px]"
                />
                <span
                  className="text-gray-500 text-sm  cursor-pointer"
                  onClick={() => setopenoptions(!openoptions)}
                >
                  {`${options.adult} adult • ${options.children} children • ${options.room}`}
                </span>
              </div>

              <div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer "
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
        {openDate && type !== "list" && (
          <>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="absolute top-[580px] z-2 md:absolute md:top-[425px] md:left-[400px]"
            />
          </>
        )}
      </div>
      {openoptions && type !== "list" && (
        <div className="text-black absolute top-[600px] md:top-[425px] md:left-[780px] rounded-md p-2 bg-white w-[200px] shadow-md h-[120px] z-2">
          <div className="my-2">
            <div className="flex justify-between items-center my-2">
              <h3>adult</h3>
              <div className="flex items-center">
                <button
                  disabled={options.adult <= 0}
                  className="notAllowed border-1 px-2 border-blue-500 rounded-sm cursor-pointer"
                  onClick={() => handleOptions("adult", "d")}
                >
                  -
                </button>
                <span className="  px-3 ">{options.adult}</span>
                <button
                  className=" border-1 px-2 border-blue-500 rounded-sm cursor-pointer"
                  onClick={() => handleOptions("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center my-2">
              <h3>children</h3>
              <div className="flex items-center justify-between">
                <button
                  disabled={options.children <= 0}
                  className="notAllowed border-1 px-2 border-blue-500 cursor-pointer rounded-sm"
                  onClick={() => handleOptions("children", "d")}
                >
                  -
                </button>
                <span className="  px-3 ">{options.children}</span>
                <button
                  className=" border-1 px-2 border-blue-500 rounded-sm cursor-pointer"
                  onClick={() => handleOptions("children", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <h3>room</h3>
              <div className="flex items-center justify-center">
                <button
                  disabled={options.room <= 0}
                  className=" notAllowed border-1 border-blue-500 px-2 rounded-sm cursor-pointer"
                  onClick={() => handleOptions("room", "d")}
                >
                  -
                </button>
                <span className="  px-3 ">{options.room}</span>
                <button
                  className=" border-1 px-2 border-blue-500 cursor-pointer rounded-sm"
                  onClick={() => handleOptions("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
