import { footerData } from "./FooterLink";
const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 py-10 px-5 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {footerData.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-2 my-2">{item.country}</h3>
              <ul className="text-sm text-gray-600">
                {item.districts.map((district, idx) => (
                  <li
                    key={idx}
                    className="mb-1 hover:text-blue-600 cursor-pointer my-2"
                  >
                    {district} Hotels
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <h1 className="footerTitle">
        © Copy rights reserved {new Date().getFullYear()}
      </h1>
    </>
  );
};

export default Footer;
