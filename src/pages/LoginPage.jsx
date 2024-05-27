import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://authentication-pf3yfmx32q-uc.a.run.app/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.table(response.data);
        const { token, first_name, last_name, phone_number, email, user_type } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("user_type", user_type);

        // Call testToken after successful login
        await testToken();

        navigate("/dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setModalMessage("Invalid email or password.");
        setShowModal(true);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const testToken = async () => {
    try {
      const response = await axios.post(
        "https://luoi-lot-ca-pf3yfmx32q-de.a.run.app/api/huh",
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Test token response:", response.data);
    } catch (error) {
      console.error("Error testing token:", error);
    }
  };

  return (
    <div className="flex bg-white h-screen">
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg relative max-w-sm w-full'>
            <p className='text-center text-lg font-bold justify-center pt-10'>{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className=' w-full bg-blue-500 text-blue pb-7  rounded hover:text-sky-600 '
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className='text-blue font-bold text-4xl w-1/2 justify-center items-center flex flex-col transform -translate-y-8'>
        <div className='text-center'>
          <p className='p-1 mb-1'>INVENTORY</p>
          <p className='p-1 mb-1'>MANAGEMENT</p>
          <p className='p-1'>SYSTEM</p>
          <p className='p-1 smaller-text'> Group 1</p>                    
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '10px'}}>
          <img src="login_asset/shiba.png" alt="Image 1" style={{ width: '33.33%', margin: '0 1%' }} />
          <img src="login_asset/tram.png" alt="Image 2" style={{ width: '33.33%', margin: '0 1%' }} />
          <img src="login_asset/quynh.png" alt="Image 3" style={{ width: '33.33%', margin: '0 1%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="login_asset/Sang.png" alt="Image 1" style={{ width: '33.33%', margin: '0 1%' }} />
          <img src="login_asset/nghia.png" alt="Image 2" style={{ width: '33.33%', margin: '0 1%' }} />
          <img src="login_asset/na.png" alt="Image 3" style={{ width: '33.33%', margin: '0 1%' }} />
          <img src="login_asset/huy.png" alt="Image 4" style={{ width: '33.33%', margin: '0 1%' }} />
        </div>
      </div>

      <div className="flex flex-col w-1/2 items-center justify-center font-bold">
        <form className="w-1/2 gap-6" onSubmit={handleLogin}>
          <p className="text-3xl mb-5">Log in</p>
          <label className="font-medium">Email</label>
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded font-thin"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full p-2 border font-thin border-gray-300 rounded"
              placeholder="Input password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {showPassword ? (
                <FiEyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <FiEye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue p-4 my-5 rounded-lg text-white font-semibold w-full"
          >
            Log in
          </button>
        </form>
        <div className="text-center flex p-2">
          Don't have an account?
          <p className="text-blue px-1">
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
