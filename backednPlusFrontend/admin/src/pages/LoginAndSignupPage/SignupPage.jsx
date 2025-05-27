import React, { useState, useRef } from 'react';
import './SignupPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminLoginApi, sendOTPForLoginApi } from '../../redux/api/user_api';

const SignUp = () => {
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
   try {
    console.log(sendOTPForLoginApi)
      const response = await axios.post(sendOTPForLoginApi, GetEmailOrPhone(email) === 'email' ? { email } : { phoneNumber: email });
      console.log(response);
   } catch (error) {
    
   }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response = await axios.post(AdminLoginApi, { email, password });
      console.log(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9HcY9KaNSCLNqTrSHP4RKO0ZFw5YvxpHWw&s" alt="eKincare logo" className="logo" />
        <h2>Sign up</h2>
        <p className="sub-text">Sign up new account</p>
  
        <form className="login-form" onSubmit={handleLogin}>
          {/* <label>Email</label> */}
          <input
            type="email"
            placeholder="Enter email of Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
  
          {!loginWithOtp ? (
            <>
              <label>Password</label>
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
            <button type="button" className="send-otp" onClick={handleSendOtp}>
              Send OTP
            </button>
          )}
  
          <div className="checkbox-row">
            <input
              type="checkbox"
              checked={loginWithOtp}
              onChange={() => {
                setLoginWithOtp(!loginWithOtp);
                setOtpSent(false);
              }}
            />
            <label>Login with OTP</label>
          </div>
  
          <button type="submit" className="sign-in-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'SIGN IN'}
          </button>
        </form>
  
        <p className="terms-text">
          By clicking on Sign In, I agree to the terms and conditions
        </p>
  
        <p className="signup-link">
          HAVE AN ACCOUNT? <Link to="/login">LOG IN</Link>
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default SignUp;
