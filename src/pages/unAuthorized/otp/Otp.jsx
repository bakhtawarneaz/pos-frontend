import React, { useRef, useState } from 'react'
/* assets...*/
import Logo from  '@assets/logo.png';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';
import LoginSlider from '@components/LoginSlider';

/* styles...*/
import '@styles/_auth.css';

/* packages...*/
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

/* hooks...*/
import { useVerifyOtp } from '@hooks/useMutation';

const Otp = () => {

     /* UseState Here...*/
     const [otp, setOtp] = useState(Array(6).fill(""));
     const [isLoading,setLoading] =useState(false);
     
 
     /* Hooks...*/
     const navigate = useNavigate();
     const inputRefs = useRef([]);
 
     /* Mutations...*/
     const mutation = useVerifyOtp(navigate, setLoading);
 
     const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputRefs.current[index - 1].focus();
        }
    };

     /* Functions Here...*/
     const handleSubmit = (e) => {
        e.preventDefault();
        const finalOtp = otp.join("").trim();
        if (finalOtp.length !== 6) {
          toast.error("Please enter a valid 6-digit OTP.");
          return;
        }
    
        setLoading(true);
        mutation.mutate({ otp: finalOtp });
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
                    <h1>Verify Your Account</h1>
                    <p>We've sent a 6-digit verification code </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Otp Code</label>
                        <div className="input-wrap otp-input-group">
                            {otp.map((digit, index) => (
                                <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="otp-box"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="auth-form-btn">
                        <button className="site-btn btn-secondery" disabled={isLoading}>
                        {isLoading ? (
                            <ButtonLoader />
                        ) : (
                            "Verify Code"
                        )}
                        </button>
                    </div>
                </form>
            </div>
         </div>
         <div className='right'>
            <LoginSlider />
         </div>
      </div>
    </div>
  )
}

export default Otp
