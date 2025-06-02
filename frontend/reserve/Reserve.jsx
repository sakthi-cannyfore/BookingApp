import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../src/components/hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../src/components/context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setToggle, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const selectedDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = selectedDateRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomnumber) => {
    const isFound = roomnumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const navigate = useNavigate();
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const HandleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomid) => {
          const res = axios.put(`/api/rooms/availability/${roomid}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      navigate("/");
      setToggle(false);
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[50%] max-w-lg shadow-lg  h-[100%] relative">
        <button
          onClick={() => setToggle(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Select Room</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {data.map((item) => (
            <div
              key={item._id}
              className=" p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div className="mb-2">
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
                <div className="text-sm">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div className="text-sm">
                  Price: <b>{item.price}</b>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {item.roomNumbers.map((roomnumber) => (
                  <label
                    key={roomnumber._id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={roomnumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomnumber)}
                      className="accent-blue-600"
                    />
                    <span>{roomnumber.number}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            onClick={HandleClick}
          >
            Reserve Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
