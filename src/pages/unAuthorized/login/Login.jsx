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

const Login = () => {

    /* UseState Here...*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading,setLoading] =useState(false);

    /* Functions Here...*/
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        if (!trimmedUsername || !trimmedPassword) {
            toast.error('All fields are required');
            setLoading(false);
            return;
        }
        const PAY_LOAD = { 
          username: trimmedUsername, 
          password: trimmedPassword
        };
        mutation.mutate(PAY_LOAD);
      };
  
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <h1>Login to your Account 👋</h1>
                    <p>Welcome Back to <span>Inventory Pro</span></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Username</label>
                        <div className="input-wrap">
                        <input
                            id="email"
                            placeholder="Enter your Username"
                            type="text"
                            className="input-elm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className='passLbl_forgotBtn'>
                            <label htmlFor="password">Password</label>
                            <Link>Forgot password ?</Link>
                        </div>
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
                    <div className="auth-form-btn">
                        <button className="site-btn btn-secondery" disabled={isLoading}>
                        {isLoading ? (
                            <ButtonLoader />
                        ) : (
                            "Login"
                        )}
                        </button>
                    </div>
                </form>
                <p className="platform">
                    <span>Not a Registered ?</span>
                    <Link to={''}>Create account</Link>
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

export default Login
