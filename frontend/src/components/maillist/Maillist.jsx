const Maillist = () => {
  return (
    <div className="footer mt-[50px] h-[200px] my-[20px] flex items-center justify-center bg-[#003580] w-full text-white">
      <div className="">
        <div>
          <h1 className="text-4xl my-2">Save time, Save money!</h1>
          <h1 className="my-2">Sign up and we 'll send best deals for you </h1>
        </div>

        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Your mail"
            className="w-full h-[30px] focus:outline-none border-1 bg-gray-50 text-black"
          />
          <button className="h-[30px] px-2 rounded-sm cursor-pointer bg-blue-400">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maillist;
