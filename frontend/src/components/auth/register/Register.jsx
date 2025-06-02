import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userCredential, setUserCredential] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setUserCredential({
      ...userCredential,
      [e.target.id]: e.target.value,
    });
  };

  const HandleClick = async () => {
    try {
      const res = await axios.post(`/api/auth/register`, userCredential);
      navigate("/login");
      return res.data;
    } catch (error) {
      console.log("handleclicke error for regiter", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center w-full"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww")`,
        }}
      >
        <div className="h-[300px] w-[400px]  flex items-center justify-center opacity-[80%] rounded-3xl overflow-hidden backdrop-blur-3xl bg-white">
          <div>
            <h1>Register</h1>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="enter name"
                id="username"
                onChange={handleChange}
                className="w-full  my-2 bg-gray-300 outline-1 focus:none px-[10px] py-1 rounded-md "
              />
              <input
                type="text"
                placeholder="enter email"
                id="email"
                onChange={handleChange}
                className="w-full  my-2 bg-gray-300 outline-1 focus:none px-[10px] py-1 rounded-md "
              />
              <input
                type="password"
                placeholder="enter password"
                id="password"
                onChange={handleChange}
                className="w-full  my-2 bg-gray-300 outline-1 focus:none px-[10px] py-1 rounded-md "
              />
            </div>
            <div>
              <button
                className="bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={HandleClick}
              >
                register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
