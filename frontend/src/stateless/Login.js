import React from 'react';
import '../Style.css'

const Login = ()  =>
      <div>
        <div className="container">
          <div className="form_validation">
              <span>Login</span>
              <input type="text" required placeholder="Mobile Number" />
              <input type="password" required placeholder="Password" />     
              <button type="submit">Login</button> 
          </div> 
        </div>
      </div>

export default Login;
