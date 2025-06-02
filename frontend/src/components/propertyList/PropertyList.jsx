import useFetch from "../hooks/useFetch";
import "./PropertyList.css";
const PropertyList = () => {

    const { data, loading, Error} = useFetch("/api/hotels/countByType");


  const images = [
"https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" ,
"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
]
  return (
   <div className="pList mt-[10px]">
  {data && images.map((item, i) => (
    <div className="propertyItems" key={i}>
      <div>
        <imgf
          src={images[i]}
          alt=""
          className="pListImg"
        />
      </div>
      <div>
        <h1 className="font-bold capitalize">{data[i]?.type}</h1>
        <h1 className="text-sm">{data[i]?.count} {data[i]?.type} </h1>
      </div>
    </div>
  ))}
</div>

  );
};

export default PropertyList;
