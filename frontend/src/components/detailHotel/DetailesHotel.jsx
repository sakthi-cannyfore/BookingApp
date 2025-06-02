import {
  faCircleLeft,
  faCircleRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../pages/header/Header";
import Navbar from "../navbar/Navbar";
import "./DetailesHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Maillist from "../maillist/Maillist";
import Footer from "../footer/Footer";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../../../reserve/Reserve";

const DetailesHotel = () => {
  const [sliderPhoto, setSliderPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, loading, Error } = useFetch(`/api/hotels/${id}`);

  const handleImage = (i) => {
    setSliderPhoto(i);
    setOpen(true);
  };

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDifference(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDate = Math.ceil(diffTime / MILLISECONDS_PER_DAY);

    return diffDate;
  }

  const days = dateDifference(dates[0].endDate, dates[0].startDate);

  const HandleMove = (direction) => {
    let newIndex;

    if (direction === "l") {
      newIndex = sliderPhoto === 0 ? data.photos.length - 1 : sliderPhoto - 1;
    } else {
      newIndex = sliderPhoto === data.photos.length - 1 ? 0 : sliderPhoto + 1;
    }

    setSliderPhoto(newIndex);
  };

  const handleClick = () => {
    if (user) {
      setToggle(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <Header type="list" />

      <div className="">
        <div className="flex justify-center">
          <div className="w-full max-w-[1024px] flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{data.name} </h1>
              <div>
                <FontAwesomeIcon icon={faLocationDot} className="mr-[5px]" />
                <span className="font-semibold text-gray-700 text-sm">
                  {data.address}
                </span>
              </div>
              <h1 className="text-xl font-semibold text-sky-500">
                Excelent Location - {data.distance} m from center
              </h1>
              <h1 className="text-green-600 font-semibold">
                Book a stay over $114 at this property and get a free airport
                taxi
              </h1>
            </div>

            <div>
              <button className="px-2 py-2 bg-sky-600 text-white rounded-md cursor-pointer top-[10px] relative">
                Reserve or Book Now !
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="sticky top-[0px] bg-white-1/2 w-full h-screen flex justify-center items-center backdrop-blur-md ">
            <div className="relative">
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => setOpen(!open)}
                className="text-3xl absolute right-[50px] top-[-20px] text-red-700 cursor-pointer"
              />
              <div className="flex justify-between ">
                <div>
                  <FontAwesomeIcon
                    icon={faCircleLeft}
                    onClick={() => HandleMove("l")}
                    className=" relative top-[50%] mr-[50px] text-3xl text-black cursor-pointer"
                  />
                </div>
                <img
                  src={data.photos[sliderPhoto]}
                  alt="random iamge"
                  className="w-[800px] h-[500px]"
                />
                <div>
                  <FontAwesomeIcon
                    icon={faCircleRight}
                    onClick={() => HandleMove("r")}
                    className=" relative top-[50%] ml-[50px] text-3xl text-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="w-full max-w-[1024px] grid grid-cols-3 gap-2 my-2 cursor-pointer">
            {data.photos &&
              Array.isArray(data.photos) &&
              data.photos.map((image, i) => (
                <div key={i} className="flex flex-col">
                  <img
                    onClick={() => handleImage(i)}
                    src={image}
                    alt={`hotel-${i}`}
                    className="w-[400px] flex flex-wrap "
                  />
                </div>
              ))}

            {/* {data.photos.map((image, i) => (
              <div className="flex flex-col">
                <img
                  onClick={() => handleImage(i)}
                  src={image}
                  className="w-[400px] flex flex-wrap "
                />
              </div>
            ))} */}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[1024px] flex justify-between">
            <div>
              <h1 className="text-3xl font-bold my-3">{data.title}</h1>
              {data.desc}
            </div>
            <div>
              <div className="w-[300px] bg-sky-100 p-4 my-[10px] rounded-md">
                <h1 className="text-xl font-bold">
                  Perfect for a {days}-night stay!
                </h1>
                <p className="mt-3 font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi, porro?
                </p>
                <div className="flex mt-2 ">
                  <h1 className="text-xl font-bold mr-[5px]">
                    ${days * data.cheapestPrice * options.room}
                  </h1>
                  <span className="text-xl ">({days} nights)</span>
                </div>

                <button
                  className="px-2 py-2 bg-sky-600 text-white rounded-md mt-4"
                  onClick={handleClick}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
        <Maillist />
        <Footer />
      </div>
      {toggle && <Reserve setToggle={setToggle} hotelId={id} />}
    </div>
  );
};

export default DetailesHotel;
