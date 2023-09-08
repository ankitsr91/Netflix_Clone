import React, { useState } from 'react'
import "./Login.css"
import SignupScreen from './SignupScreen';
function Login() {
    const [signIn,setSetIn]=useState(false);
  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <img className="loginScreen_logo"src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="" />
        <button onClick={()=>setSetIn(true)} className='loginScreen_button'>Sign In</button>
        <div className="loginScreen_gradient"></div>
        <div className="loginScreen_body">
            {signIn?(
                <SignupScreen/>
            ):(
                <>
                <h1>Unlimited films,TV Shows and more</h1>
                <h2>Watch anywhere.Cancel Anytime.</h2>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className="loginScreen_input">
                    <form>
                        <input type="email" placeholder='Email Address' />
                        <button onClick={()=>setSetIn(true)} className='loginScreen_getStarted'>Get Started</button>
                    </form>
                </div>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Login
