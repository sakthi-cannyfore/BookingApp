// import DetailesHotel from "../../components/detailHotel/DetailesHotel";
import Featured from "../../components/featured/Featured";
import FeaturedProperty from "../../components/featuredproperty/FeaturedProperty";
import Footer from "../../components/footer/Footer";
import Maillist from "../../components/maillist/Maillist";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Header from "../header/Header";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <span className="proprtyTitle my-[10px]">
          Browse by property type
          <PropertyList />
          <span className="homeTitle my-[10px]">Home Guests love</span>
          <FeaturedProperty />
        </span>
      </div>
      <Maillist />
      <Footer />
      {/* <DetailesHotel/> */}
    </div>
  );
};

export default Home;
