import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [First_name, setFirst_name] = useState('');
  const [Last_name, setLast_name] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Phone_number, setPhone_number] = useState('');
  const [User_type] = useState('USER'); // Default user type
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Email and password validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }
    if (Password.length < 8) {
      setModalMessage("Password must be at least 8 characters long.");
      setShowModal(true);
      return;
    }
    if (Password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://authentication-pf3yfmx32q-uc.a.run.app/user/signup",
        {
          First_name: First_name,
          Last_name: Last_name,
          Password: Password,
          Email: Email,
          Phone_number: Phone_number,
          User_type: User_type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='flex bg-white h-screen'>
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
        
        <div className='flex justify-center mb-5 mt-3'>
          <img src="login_asset/shiba.png" alt="Image 1" className='w-1/4 mx-1' />
          <img src="login_asset/tram.png" alt="Image 2" className='w-1/4 mx-1' />
          <img src="login_asset/quynh.png" alt="Image 3" className='w-1/4 mx-1' />
        </div>
        <div className='flex justify-center'>
          <img src="login_asset/Sang.png" alt="Image 1" className='w-1/5 mx-1' />
          <img src="login_asset/nghia.png" alt="Image 2" className='w-1/5 mx-1' />
          <img src="login_asset/na.png" alt="Image 3" className='w-1/5 mx-1' />
          <img src="login_asset/huy.png" alt="Image 4" className='w-1/5 mx-1' />
        </div>
      </div>
      <div className='flex flex-col w-1/2 items-center justify-center'>
        <form className='w-1/2' onSubmit={handleSignUp}>
          <p className='text-3xl mb-5 font-semibold'>Sign Up</p>
          <div className='flex gap-4 py-3'>
            <div className='flex-1'>
              <label>First Name</label>
              <input
                type="text"
                className='block w-full p-2 border border-gray-300 rounded'
                placeholder='Enter your first name'
                value={First_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className='flex-1'>
              <label>Last Name</label>
              <input
                type="text"
                className='block w-full p-2 border border-gray-300 rounded'
                placeholder='Enter your last name'
                value={Last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
          </div>
          <div className='py-3'>
            <label>Email</label>
            <input
              type="email"
              className='block w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='py-3'>
            <label>Phone Number</label>
            <input
              type="text"
              className='block w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your phone number'
              value={Phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
            />
          </div>
          <div className='py-3'>
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full p-2 border border-gray-300 rounded"
                placeholder='Input password'
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                {showPassword ? (
                  <FiEyeOff onClick={() => setShowPassword(false)} />
                ) : (
                  <FiEye onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
          </div>
          <div className='py-3'>
            <label>Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full p-2 border border-gray-300 rounded"
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                {showPassword ? (
                  <FiEyeOff onClick={() => setShowPassword(false)} />
                ) : (
                  <FiEye onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className='bg-blue-500 p-3 rounded-lg text-white font-semibold w-full bg-blue hover:bg-sky-600 transition duration-300'>Sign up</button>
        </form>
        <div className='text-center flex mt-3'>
          Already have an account?
          <p className='text-sky-500 ml-1'><Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
