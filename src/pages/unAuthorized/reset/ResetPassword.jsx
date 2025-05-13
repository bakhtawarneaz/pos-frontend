import React, { useState } from 'react'

/* assets...*/
import Logo from  '@assets/logo.png';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';
import LoginSlider from '@components/LoginSlider';

/* styles...*/
import '@styles/_auth.css';

/* icons...*/
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

/* packages...*/
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

/* hooks...*/
import { useResetPassword } from '@hooks/useMutation';

const ResetPassword = () => {

  /* UseState Here...*/
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading,setLoading] =useState(false);

  /* Hooks...*/
  const navigate = useNavigate();

  /* Mutations...*/
  const mutation = useResetPassword(navigate, setLoading);

  /* Functions Here...*/
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      const trimmedPassword = password.trim();
      const trimmedConfirmPassword = confirmPassword.trim();
      if (!trimmedPassword || !trimmedConfirmPassword) {
        toast.error('All fields are required');
        setLoading(false);
        return;
      }
      const PAY_LOAD = { 
        password: trimmedPassword, 
        confirm_password: trimmedConfirmPassword
      };
      mutation.mutate(PAY_LOAD);
  };

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
<div className='auth_body'>
      <div className='auth_wraper'>
         <div className='left'>
            <svg className="border" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 40 40" fill="none" stroke="rgb(226 232 240)" strokeWidth="0.4"></path><path d="M 0 40 L 40 40" fill="none" stroke="rgb(226 232 240)" strokeWidth="0.4"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid-pattern)"></rect></svg>
            <div className='logo'>
                <img src={Logo} alt='logo' />
            </div>
            <div className='auth_form_body'>
                <div className='heading'>
                    <h1>Reset your Password</h1>
                    <p>Password must be at least 6 characters</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                        <div className="input-wrap">
                          <input
                              id="password"
                              placeholder="**********"
                              type={showPassword ? "text" : "password"}
                              className="input-elm"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="eye-btn" onClick={togglePasswordVisibility}>
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-wrap">
                          <input
                              id="confirmPassword"
                              placeholder="**********"
                              type={showPassword2 ? "text" : "password"}
                              className="input-elm"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <div className="eye-btn" onClick={togglePasswordVisibility2}>
                              {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                          </div>
                        </div>
                    </div>
                    <div className="auth-form-btn">
                        <button className="site-btn btn-secondery" disabled={isLoading}>
                        {isLoading ? (
                            <ButtonLoader />
                        ) : (
                            "Reset Password"
                        )}
                        </button>
                    </div>
                </form>
                <p className="platform">
                    <span>Already Registered?</span>
                    <Link to={'/auth/login'}>Login</Link>
                </p>
            </div>
         </div>
         <div className='right'>
            <LoginSlider />
         </div>
      </div>
    </div>
  )
}

export default ResetPassword
