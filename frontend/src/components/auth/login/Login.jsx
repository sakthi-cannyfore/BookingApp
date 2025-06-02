import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userCredential, setUserCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setUserCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        userCredential
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen   ">
      <div
        className="flex items-center  justify-center  h-screen bg-cover bg-center w-full "
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D")`,
        }}
      >
        <div className="h-[300px] w-[400px]  flex items-center justify-center opacity-[80%] rounded-3xl overflow-hidden backdrop-blur-3xl bg-white">
          <div className="">
            <h1>Login</h1>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="enter name"
                id="username"
                onChange={handleChange}
                className="w-full  my-2 bg-gray-300 outline-1 focus:none px-[10px] py-1 rounded-md "
              />
              <input
                type="password"
                placeholder="enter password"
                id="password"
                onChange={handleChange}
                className="w-full  my-2 bg-gray-300 focus:none outline px-[10px] py-1 rounded-md"
              />
            </div>
            {error && <span className="text-red-400">{error.message}</span>}
            <div className="flex justify-between">
              <button
                onClick={handleClick}
                className="bg-green-500 text-white px-1 cursor-pointer font-semibold my-1 rounded-lg"
              >
                submit
              </button>
              <Link to={"/register"} className="">
                <button className="bg-blue-500 text-white px-1 cursor-pointer font-semibold my-1 rounded-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
