import React, { useState } from 'react'
/* assets...*/
import Logo from  '@assets/logo.png';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';
import LoginSlider from '@components/LoginSlider';

/* styles...*/
import '@styles/_auth.css';

/* packages...*/
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

/* hooks...*/
import { useSendOtp } from '@hooks/useMutation';

const Forgot = () => {

    /* UseState Here...*/
    const [email, setEmail] = useState('');
    const [isLoading,setLoading] =useState(false);

    /* Hooks...*/
    const navigate = useNavigate();

    /* Mutations...*/
    const mutation = useSendOtp(navigate, setLoading);

    /* Functions Here...*/
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error('Email is required');
            setLoading(false);
            return;
        }
        const PAY_LOAD = { 
            email: trimmedEmail, 
        };
        mutation.mutate(PAY_LOAD);
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
                    <h1>Forgot Password?</h1>
                    <p>No worries, we'll send you reset instructions</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrap">
                        <input
                            id="email"
                            placeholder="Enter your Email"
                            type="text"
                            className="input-elm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                    </div>
                    <div className="auth-form-btn">
                        <button className="site-btn btn-secondery" disabled={isLoading}>
                        {isLoading ? (
                            <ButtonLoader />
                        ) : (
                            "Send Email"
                        )}
                        </button>
                    </div>
                </form>
                <p className="platform">
                    <span>Remember password ?</span>
                    <Link to={'/auth/login'}>login</Link>
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

export default Forgot
