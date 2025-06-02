import Navbar from "../../components/navbar/Navbar";
import Header from "../header/Header";
import Hotel from "../hotel/Hotel";

const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <Hotel />
    </div>
  );
};

export default List;
