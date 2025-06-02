import useFetch from "../hooks/useFetch";
import "./Featured.css";
const Featured = () => {
  const { data, loading, Error } = useFetch(
    "/api/hotels/countByCity?cities=London,Madrid,Berlin"
  );

  return (
    <div className="featured ">
      <div className="relative">
        <div className="imageContainer">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o= "
            className="object-fit rounded-lg"
            alt="random image"
          />
        </div>

        <div className="imageTitle  absolute top-[50px] left-[8px] text-md font-bold text-white md:top-[250px] md:left-4 md:text-2xl md:font-bold md:text-white">
          <h1>London</h1>
          <h1>{data[0]} properties</h1>
        </div>
      </div>

      <div className="relative">
        <div className="imageContainer ">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o= "
            alt="random image "
            className="rounded-lg"
          />
        </div>

        <div className="imageTitle absolute top-[50px] left-[8px] text-md font-bold text-white md:top-[250px] md:left-4 md:text-2xl md:font-bold md:text-white">
          <h1>Madrid</h1>
          <h1>{data[1]} properties</h1>
        </div>
      </div>

      <div className="relative">
        <div className="imageContainer">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=  "
            alt="random image"
            className="rounded-lg"
          />
        </div>

        <div className="imageTitle absolute top-[50px] left-[8px] text-md font-bold text-white md:top-[250px] md:left-4 md:text-2xl md:font-bold md:text-white">
          <h1>Berlin</h1>
          <h1>{data[2]} properties</h1>
        </div>
      </div>
    </div>
  );
};

export default Featured;
