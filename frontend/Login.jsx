import React, { useState, useRef } from 'react';
import './LoginPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminLoginApi, sendOTPForLoginApi } from '../../redux/api/user_api';
import { toast } from 'react-toastify';
const Login = () => {
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingOtpSend , setLoadingOtpSend] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);

    if (value && index < otpDigits.length - 1) {
      otpRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const GetEmailOrPhone = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone numbers

    if (emailRegex.test(email)) {
      return  "email" ;
    } else if (phoneRegex.test(email)) {
      return 'phoneNumber';
    } else {
      return { type: 'invalid', value: '' };
    }
  };

  const handleSendOtp = async() => {
    setLoadingOtpSend(true);
   try {
      const response = await axios.post(sendOTPForLoginApi, GetEmailOrPhone(email) === 'email' ? { email } : { phoneNumber: email });

      if (response.data.success) {
        setOtpSent(true);
        setLoadingOtpSend(false);
        toast.success(response.data.message);
      }
      else {
        setLoadingOtpSend(false);
        toast.error(response.data.message);
      }
   } catch (error) {
      console.error('Error sending OTP:', error);
      setLoadingOtpSend(false);
      toast.error('Failed to send OTP. Please try again.' + error.message);
   }
  };
  const Spinner =()=> {
    return (
      <button disabled>
        <div className="spinner" />
      </button>
  )
  }

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (loginWithOtp && otpSent) {
        const otp = otpDigits.join('');
        const otpResponse = await axios.post(AdminLoginApi,{
          [GetEmailOrPhone(email)]: email,
          otp
        });
        console.log('OTP Response:', otpResponse.data);
        if (otpResponse.data.success) {
          toast.success('Login successful with OTP');
          navigate('/admin/dashboard');
        } else {
          toast.error('Invalid OTP. Please try again.');
          setLoading(false);
          return;
        }
        
      }else if(!loginWithOtp && !otpSent){
        const response = await axios.post(AdminLoginApi, {
          [GetEmailOrPhone(email)]: email,
          password
        });
        console.log('Login Response:', response.data);
        if (response.data.success) {
          toast.success('Login successful');
          navigate('/admin/dashboard');
        } else {
          toast.error('Invalid email or password. Please try again.');
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || 'Login failed. Please try again.');
      } else {
        toast.error('An error occurred during login. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    <div className="left-panel">
      <img src="./adminLogin.jpg" alt="admin img" className="admin-image" />
    </div>
  
    <div className="right-panel">
      <div className="login-box">
        <img src="https://i.pinimg.com/1200x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg" alt="eKincare logo" className="logo" />
        <h2>Welcome to Admin Portal</h2>
        <p className="sub-text">Log in in to your account</p>
  
        <form className="login-form" onSubmit={handleLogin}>
          {/* <label>Email</label> */}
          <input
            type="text"
            placeholder="Enter email of Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
  
          {!loginWithOtp ? (
            <>
              {/* <label>Password</label> */}
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : otpSent ? (
            <div className="otp-inputs">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (otpRefs.current[index] = el)}
                />
              ))}
            </div>
          ) : (
            loadingOtpSend ? (
              <Spinner />
            ) : (
              <button type="button" className="send-otp" onClick={handleSendOtp}>
                Send OTP
              </button>
            )
          
          )}
  
          <div className="checkbox-row">
            <input
              type="checkbox"
              checked={loginWithOtp}
              onChange={() => {
                setLoginWithOtp(!loginWithOtp);
                setOtpSent(false);
                setOtpDigits(['', '', '', '', '', '']);
              }}
            />
            <label>Login with OTP</label>
          </div>
  
          <button
                type="submit"
                className="sign-in-btn"
                style={{
                  backgroundColor: loginWithOtp && !otpSent ? '#d3d3d3' : '', 
                  cursor: loginWithOtp && !otpSent ? 'not-allowed' : 'pointer',
                }}
                disabled={loading || (loginWithOtp && !otpSent)}
              >
                {loading ? 'Signing in...' : 'LOG IN'}
              </button>
        </form>
  
        <p className="terms-text">
          By clicking on Sign In, I agree to the terms and conditions
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
